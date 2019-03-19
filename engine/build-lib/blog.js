const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const consts = require('./consts');
const translation = require('./translation');


// build list of blogs
function build(lang, content) {
    return new Promise(resolve => {
        if (!fs.existsSync(consts.SRC_BLOG_DIR + lang)) {
            return resolve(content);
        }
        fs.readdirSync(consts.SRC_BLOG_DIR + lang).forEach(item => {
            if (item === 'README.md') {
                return;
            }
            if (item.match(/^\d\d\d\d_\d\d/)) {
                const name = item.replace(/\.md/i, '');
                const d = name.match(/^(\d\d\d\d)_(\d\d)_(\d\d)(_\d)?/);
                let text = fs.readFileSync(path.join(consts.SRC_BLOG_DIR + lang, item)).toString('utf-8');
                let {body, header} = utils.extractHeader(text);
                body = body.replace(/\r/g, '');
                header.title = utils.getTitle(body) || '';
                header.editLink = consts.GITHUB_EDIT_ROOT + 'blog/' + lang + '/' + item;

                const lines = body.trim().split('\n');

                if (text.match(/!\[/)) {
                    const m = lines[0].match(/!\[([^\]]*)]\(([^)]*)\)/);
                    if (m && m.length === 3) {
                        lines.shift();
                        let link = m[2];
                        if (!link.toLowerCase().match(/^https?:\/\//)) {
                            if (link.startsWith('../')) {
                                link = lang + '/blog/' + link.substring(3);
                            } else {
                                link = lang + '/blog/' + link;
                            }
                        }
                        header.logo = link;
                    }
                }

                // remove leading empty lines
                while(lines.length && !lines[0]) lines.shift();


                // remove title from text
                if (header.title) {
                    if (lines[0].startsWith('# ')) {
                        lines.shift();

                        // remove leading empty lines
                        while(lines.length && !lines[0]) lines.shift();
                    }
                }

                if (d) {
                    const date = d[1] + '.' + d[2] + '.' + d[3] + (d[4] ? '_' + d[4] : '');
                    content.pages[name] = content.pages[name] || {
                        date,
                        title: {},
                        type: header.type || 'news',
                        originalName: item,
                    };
                    content.pages[name].title[lang] = header.title || date;
                    utils.writeSafe(consts.FRONT_END_DIR + lang + '/blog/' + name + '.md', utils.addHeader(lines.join('\n'), header));
                } else {
                    console.error('Invalid name format: ' + name + '. Expected YEAR_MM_DD.md or YEAR_MM_DD_N.md');
                }
            }
        });

        // copy blog/images if exists
        if (fs.existsSync(consts.SRC_BLOG_DIR + 'images/')) {
            utils.createDir(consts.FRONT_END_DIR + lang + '/blog/images/');
            utils.copyDir(consts.SRC_BLOG_DIR + 'images/', consts.FRONT_END_DIR + lang  + '/blog/images/');
        }

        // copy images
        if (fs.existsSync(consts.SRC_BLOG_DIR + lang + '/images/')) {
            utils.createDir(consts.FRONT_END_DIR + lang + '/blog/images/');
            utils.copyDir(consts.SRC_BLOG_DIR + lang + '/images/', consts.FRONT_END_DIR + lang + '/blog/images/');
        }

        resolve(content);
    });
}

function sync2Languages(fromLang, toLang, content, cb) {
    const file = Object.keys(content.pages).find(file => {
        const fromFile = consts.SRC_BLOG_DIR + fromLang + '/' + content.pages[file].originalName;
        const toFile = consts.SRC_BLOG_DIR + toLang + '/' + content.pages[file].originalName;

        //const fromFilePublic = consts.FRONT_END_DIR + fromLang + '/blog/' + file + '.md';
        const toFilePublic = consts.FRONT_END_DIR + toLang + '/blog/' + file + '.md';

        // read from
        if (fs.existsSync(fromFile)) {
            let {header} = utils.extractHeader(fs.readFileSync(fromFile).toString('utf-8'));
            if (!header.translatedFrom) {
                let doTranslate = !fs.existsSync(toFile);
                /*if (!doTranslate) {
                    let {header} = utils.extractHeader(fs.readFileSync(toFile).toString('utf-8'));
                    if (header.translatedFrom === fromLang) {
                        doTranslate = true;
                    }
                }*/
                return doTranslate;
            }
        }
    });

    if (file) {
        // const fromFile = consts.SRC_BLOG_DIR + fromLang + '/' + content.pages[file].originalName;
        const toFile = consts.SRC_BLOG_DIR + toLang + '/' + content.pages[file].originalName;

        const fromFilePublic = consts.FRONT_END_DIR + fromLang + '/blog/' + file + '.md';
        const toFilePublic = consts.FRONT_END_DIR + toLang + '/blog/' + file + '.md';

        // read from
        let {body, header} = utils.extractHeader(fs.readFileSync(fromFilePublic).toString('utf-8'));

        translation.translateMD(fromLang, body, toLang)
            .then(_body => {
                body = _body;
                return translation.translateText(fromLang, header.title, toLang);
            }).then(title => {
                header.title = title;
                content.pages[file].title[toLang] = title;
                header.translatedFrom = fromLang;
                const localHeader = JSON.parse(JSON.stringify(header));
                delete localHeader.editLink;
                utils.writeSafe(toFile, utils.addHeader(body, localHeader));
                utils.writeSafe(toFilePublic, utils.addHeader(body, header));
                setTimeout(() => sync2Languages(fromLang, toLang, content, cb), 500);
            });
    } else {
        cb && cb(content);
    }
}

function processTasks(tasks, content, cb) {
    if (!tasks || !tasks.length) {
        cb && cb();
    } else {
        const task = tasks.shift();
        sync2Languages(task.fromLang, task.toLang, content, () =>
            setTimeout(() => processTasks(tasks, content, cb), 0));
    }
}

function buildAll() {
    const content = {pages: {}};
    return new Promise(resolve => {
        Promise.all(consts.LANGUAGES.map(lang => build(lang, content)))
            .then(contents => {
                console.log(JSON.stringify(contents[0]));

                // sync all directories
                const tasks = [];
                consts.LANGUAGES.map(lang => {
                    consts.LANGUAGES
                        .filter(lang2 => lang2 !== lang)
                        .map(lang2 => tasks.push({fromLang: lang, toLang: lang2}));
                });
                processTasks(tasks, content, () => {
                    // sort files
                    const names = Object.keys(content.pages);
                    names.sort((a, b) => a - b);
                    const old = content.pages;
                    content.pages = {};
                    names.forEach(name => content.pages[name] = old[name]);

                    fs.writeFileSync(consts.FRONT_END_DIR + 'blog.json', JSON.stringify(contents[0], null, 2));

                    resolve(content);
                });
            });
    });
}

if (!module.parent) {
    buildAll().then(() => console.log('Done'));
} else {
    module.exports = {
        buildAdapterContent
    };
}