---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: WTSAKgVijJSIgYS1KHyy/KSxzMFRzASqr8S3BdDDI+A=
---
![商标](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![新产品管理](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

ioBroker 的meteoalarm 适配器---------------------------------------------- -------------------------------- 此适配器正在从meteoalarm.eu 中提取天气警报，包括风、雪、雨、高低温等。此信息以当地语言提供，适用于详细地区。

＃＃ 如何使用它
您可以通过两种方式获取链接以检索气象警报信息。

选项 1：选择您所在的国家/地区，然后按“加载地区”，然后选择地区。然后自动填充 xml。只需按保存即可。

选项 2：转到 http://meteoalarm.eu 并选择您所在的地区。然后转到右上角的 RSS 符号，右键单击并复制链接。这是您请添加到适配器设置中的链接。

![商标](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

## 可用字段
|字段名称|说明|
|:---:|:---:|
|上次更新|适配器上次接收数据的日期|
|链接|RSS 源链接|
|位置|报警位置|
|发布日期|根据网站报警发布日期|
|HTMLToday|显示今天警报的 HTML 小部件|
|天气地图国家|警报国家天气地图的HTML链接|
|今天/明天|这些数据点适用于今天和明天：|
|文本|国家特定语言的警报文本|
|从|报警开始日期|
|至|闹钟结束日期|
|类型|报警类型为编号|
| TypeText|报警类型为文本|
|级别|报警级别为数字|
| LevelText|作为文本的警报级别|
|颜色|小部件的报警颜色|
|图标|报警类型图标|

## 警报类型
|报警类型|说明|
|:---:|:---:|
|1|风|
|2|雪/冰|
|3|雷电|
|4|雾|
|5|高温|
|6|低温|
|7|海岸事件|
|8|福雷斯特火|
|9|雪崩|
|10|雨|
|11|未知|
|12|洪水|
|13|雨洪|

＃＃ 设置
“HTML Widget 中无背景颜色”：能够使用没有背景颜色的 HTML Widget（例如，如果您想使用颜色对象来填充整个小部件，而不仅仅是 html 小部件）

“定义警告颜色”：能够以十六进制代码定义各种警报级别的颜色。用于 HTML 小部件以及颜色对象以手动将其分配给另一个小部件

“使用白色图标”：使用白色图标而不是黑色图标

“小部件中没有符号”：不要在 HTML 小部件中使用符号。您仍然可以在对象中访问它。如果您想与小部件分开显示图标 - 例如，这是 usefill在更大的尺寸。

## 警报级别
|报警级别|说明|
|:---:|:---:|
|绿色|目前没有可用的警告。|
|黄色|天气有潜在危险。预测的天气现象并不少见，但应更加关注面临气象风险的活动。随时了解预期的气象条件，不要冒任何可避免的风险。|
|橙色|天气很危险。已经预测到不寻常的气象现象。可能会造成损坏和事故。要非常细心和小心，并及时了解预期的气象条件。 |
|红色|天气非常危险。预测到异常强烈的气象现象。严重的破坏和事故，通常是大面积的，威胁着生命和财产。 |

## 支持的国家
* 奥地利
* 克罗地亚
* 捷克共和国
* 芬兰
* 德国
* 希腊
* 匈牙利
* 爱尔兰
* 以色列
* 意大利
* 拉脱维亚
* 立陶宛
* 卢森堡
* 马耳他
* 摩尔多瓦
* 黑山
* 荷兰
* 挪威
* 波兰
* 罗马尼亚
* 塞尔维亚
* 斯洛伐克
* 西班牙
* 瑞士
* 瑞典

如果你没有找到你的国家，请在github上创建一个问题，我很乐意添加它

## 不可能的国家
* 法国（没有可用的 RSS 提要）
* 葡萄牙（不可拆分）
* 斯洛文尼亚（没有可用的 RSS 提要）

##要实现的功能
* 一天处理多个闹钟

## 1.2.1 (2021-06-05)
* (jack-blackson) 修正错误以处理不正确的 XML（如果使用国家而不是地区）
* (jack-blackson) 添加卢森堡

## 1.2.0 (2021-05-16)
* (jack-blackson) 新设置：“HTML 小部件中无背景颜色”、“定义警告颜色”和“使用白色图标”
* (jack-blackson) 新图标

## 1.1.11 (2021-05-09)
* (jack-blackson) 软件包更新

## 1.1.9 (2021-05-07)
* (jack-blackson) 软件包更新

## 1.1.5 (2021-05-02)
* (jack-blackson) 修正 JS-Controller 3.3.1 错误，错误处理未定义语言

## 1.1.4 (2021-04-05)
* (jack-blackson) 处理 ENOTFOUND 错误消息，添加了 Sentry

## 1.1.3 (2021-03-29)
* (jack-blackson) 错误修复了适配器检查器

## 1.1.2 (2021-03-29)
* (jack-blackson) 数据更新不工作的修正，删除了由于 CORS 错误导致的链接自动生成

## 1.1.1 (2020-10-28)
* (jack-blackson) 修正 HTML 数据

## 1.1.0 (2020-03-29)
* (jack-blackson) 修正德国

## 1.0.9 (2020-02-06)
* (jack-blackson) 修正德国

## 1.0.8 (2019-11-15)
* (jack-blackson) 添加了波兰、摩尔多瓦、希腊、罗马尼亚
* (jack-blackson) 添加了新的数据点以获取天气图的链接

## 1.0.7 (2019-11-13)
* (jack-blackson) 添加了捷克共和国、爱尔兰、以色列、立陶宛、拉脱维亚、黑山、马耳他、塞尔维亚、瑞典

## 1.0.6 (2019-10-19)
* (jack-blackson) 添加了瑞士和斯洛拉基亚

## 1.0.5 (2019-09-22)
* (jack-blackson) 小日志调整

## 1.0.4 (2019-09-11)
*（杰克布莱克森）特拉维斯错误

## 1.0.3 (2019-09-09)
* (jack-blackson) 小错误修正，从类型“deamon”更改为“schedule”

## 1.0.2 (2019-08-25)
* (jack-blackson) 重新排序的发布信息

### 1.0.1 (2019-08-18)
* (jack-blackson) 修正没有警报图标

### 1.0.0 (2019-08-12)
* (jack-blackson) 发布版本

### 0.6.0 (2019-08-05)
* (jack-blackson) 在适配器本地存储天气图标

### 0.5.0 (2019-07-21)
* (jack-blackson) 处理超时
* (jack-blackson) 所有语言的翻译
* (jack-blackson) URL 检查

### 0.4.0 (2019-07-20)
* (jack-blackson) 添加了 NL、NO、HR、FI、ES 的数据
* (jack-blackson) 添加了类型文本，如果级别为 1，则类型现在为空（无警告）
* (jack-blackson) 调整颜色

### 0.3.0 (2019-07-13)
* (jack-blackson) 添加了 HTML 小部件
* (jack-blackson) 修正图标

### 0.2.0 (2019-07-12)
* (jack-blackson) 添加“明天”数据

### 0.1.0 (2019-07-11)
* (jack-blackson) 初始版本

##学分
由来自 www.flaticon.com 的 Freepik 设计的钟形图标

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2021 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.