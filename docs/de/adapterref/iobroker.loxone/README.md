---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.loxone/README.md
title: ioBroker.loxone
hash: 8fE4m8tPLb1oVSWM01sOObUj31hSSnV2f20hSlYJKg8=
---
![Logo](../../../en/adapterref/iobroker.loxone/admin/loxone.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.loxone.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.loxone.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/loxone-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/loxone-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/UncleSamSwiss/iobroker.loxone.svg)
![NPM](https://nodei.co/npm/iobroker.loxone.png?downloads=true)

# IoBroker.loxone
[![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/loxone/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Tests: ** ![Testen und freigeben](https://github.com/UncleSamSwiss/ioBroker.loxone/workflows/Test%20and%20Release/badge.svg)

## Loxone-Adapter für ioBroker
** _ Dieser Adapter benötigt mindestens nodejs 10.x! _ **

Ruft alle in Loxone Miniserver (und Loxone Miniserver Go) verfügbaren Informationen ab und bietet Änderungen in Echtzeit.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Installieren
Installieren Sie diesen Adapter über ioBroker Admin:

1. Öffnen Sie den Instanzkonfigurationsdialog
2. Geben Sie die IP-Adresse oder den Hostnamen und den HTTP-Port (standardmäßig 80) Ihres Loxone Miniservers ein
3. Erstellen Sie im Loxone Miniserver einen neuen Benutzer (mithilfe der Loxone Config-Anwendung), dem Sie nur Lese- und Schreibrechte für alle erforderlichen Variablen erteilen.
4. Geben Sie den Namen und das Passwort dieses Benutzers in den Konfigurationsdialog ein
5. Speichern Sie die Konfiguration
6. Starten Sie den Adapter

## Aufbau
### Miniserver Hostname / IP
Dies ist die IP-Adresse oder der Hostname Ihres Loxone Miniserver oder Miniserver Go.

### Miniserver Port
Dies ist der HTTP-Port Ihres Loxone Miniserver.

Standardmäßig ist der Miniserver so konfiguriert, dass er Port 80 überwacht. Möglicherweise haben Sie ihn jedoch geändert.

### Miniserver Benutzername
Geben Sie einen gültigen Benutzernamen für den Zugriff auf den Loxone Miniserver an.

Es wird dringend empfohlen, aus Sicherheitsgründen einen anderen Benutzer als "admin" zu verwenden.

Der Benutzer benötigt nur Lesezugriff auf die Variablen, die Sie von ioBroker aus verwenden möchten.

### Miniserver-Passwort
Geben Sie das Passwort für den angegebenen Benutzernamen ein (siehe oben).

### Namen synchronisieren
Dadurch werden die Namen in ioBroker aktualisiert, wenn sie sich in der Loxone-Konfiguration ändern.
Wenn dies deaktiviert ist, werden Namen nur synchronisiert, wenn ein Steuerelement zum ersten Mal erkannt wird.

### Räume synchronisieren
Dadurch wird die Aufzählung enum.rooms mit allen vom Loxone Miniserver bereitgestellten Räumen gefüllt und alle Steuerelemente verknüpft.

### Funktionen synchronisieren
Dadurch wird die Aufzählung enum.functions mit allen vom Loxone Miniserver bereitgestellten Kategorien gefüllt und alle Steuerelemente verknüpft.

### Wetterserver
Wählen Sie aus, welche Wetterdaten Sie synchronisieren möchten:

- "Wetterdaten nicht synchronisieren" synchronisiert nichts, was mit dem Wetterserver zusammenhängt
- "Nur aktuelles Wetter synchronisieren" synchronisiert die Daten unter "Ist".
- "24 Stunden Wettervorhersage synchronisieren" synchronisiert das aktuelle Wetter und 24 Stunden Wettervorhersage
- "Gesamte Wettervorhersage synchronisieren" synchronisiert das aktuelle Wetter und die gesamte Wettervorhersage (96 Stunden).

## Zustände
Der Adapter stellt automatisch eine Verbindung zum konfigurierten Loxone Miniserver her und erstellt Status für jeden gefundenen Steuerstatus.

Die IDs der Staaten sind wie folgt formatiert: `loxone.<instance>.<control>.<state>`

- `<Instanz>` ist der ioBroker-Adapterinstanzindex (normalerweise "0")
- `<control>` ist die UUID des Steuerelements
- `<Status>` ist der Status innerhalb des Steuerelements (weitere Informationen finden Sie unter [Unterstützte Steuerelementtypen] (# Unterstützte Steuerelementtypen)).

Der Name, der beim Konfigurieren eines Steuerelements in Loxone Config angegeben wird, wird nur als Anzeigename in ioBroker verwendet.
Dies liegt daran, dass ein Benutzer möglicherweise denselben Namen für mehrere Steuerelemente wählt.

Weitere Informationen zu Steuerelementen und ihren Status finden Sie auch in der Loxone-API (insbesondere in der Strukturdatei): https://www.loxone.com/enen/kb/api/

## Sichtbarkeit steuern
Standardmäßig verbirgt Loxone Miniserver viele Steuerelemente (und damit deren Status) vor der Weboberfläche.

Das heißt, sie sind auch vor diesem ioBroker-Adapter verborgen.

### Verwendung in der Benutzeroberfläche
Um sicherzustellen, dass alle Ihre Status ordnungsgemäß an ioBroker gemeldet werden, vergewissern Sie sich, dass im Abschnitt "Benutzeroberfläche" die Option "Verwendung" aktiviert ist:

![Verwendung in den Einstellungen der Benutzeroberfläche](../../../en/adapterref/iobroker.loxone/doc/loxone-config-use-in-visualization.png)

### Diagnoseeingaben anzeigen
Um Diagnoseeingänge (z. B. Batteriestatus von Luftgeräten) anzuzeigen, überprüfen Sie bitte, ob auf dem Gerät "Diagnoseeingänge anzeigen" aktiviert ist:

![Einstellungen der Diagnoseeingänge anzeigen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-display-diagnostics.png)

## Globale Staaten
Die folgenden globalen Zustände werden derzeit von diesem Adapter bereitgestellt:

- `operationMode`: Die aktuelle Betriebsmodusnummer des Loxone Miniserver
- `operationMode-text`: Der aktuelle Betriebsmodus des Loxone Miniserver als Text
- "Sonnenaufgang": Die Anzahl der Minuten nach Mitternacht, in denen die Sonne heute aufgeht
- "Sonnenuntergang": Die Anzahl der Minuten nach Mitternacht, in denen die Sonne heute untergeht
- "Benachrichtigungen": Die Anzahl der Benachrichtigungen
- "Änderungen": Die Anzahl der Änderungen
- Alle anderen globalen Staaten werden einfach als Texte gemeldet

## Unterstützte Steuerungstypen
Die folgenden Steuerelementtypen werden derzeit von diesem Adapter unterstützt.

Hinter dem Namen des Staates sehen Sie den Typ des Staates:

- `(rw)`: lesbar und beschreibbar: Dieser Status kann von ioBroker aus geändert werden
- `(ro)`: schreibgeschützt: Dieser Status kann nicht von ioBroker geändert werden
- `(wo)`: Nur Schreiben: Der Wert dieses Status wird von diesem Adapter nicht gemeldet, kann jedoch geändert werden, wodurch eine Aktion auf dem Loxone Miniserver ausgelöst wird

### AalSmartAlarm
Bereitgestellt von AAL Smart Alarm Control.

- `alarmLevel` (ro) die ID der aktuellen Alarmstufe
    - 0 = Kein Alarm
    - 1 = Sofortiger Alarm
    - 2 = Verzögerter Alarm
- `alarmCause` (ro) Eine Zeichenfolge, die die letzte Ursache für einen Alarm darstellt
- `isLocked` (ro) Reset aktiv, Eingaben werden ignoriert und daher werden keine Alarme ausgeführt
- `isLeaveActive` (ro) Lassen Sie den Eingang gesetzt, es werden keine Alarme ausgeführt
- `disableEndTime` (ro) Endzeit für die Deaktivierung des Steuerelements
- `bestätigen` (wo) Bestätigen Sie den anstehenden Alarm
- `disable` (wo) Deaktiviert die Steuerung für einen bestimmten Zeitraum, es werden keine Alarme ausgeführt. Wenn Sie den Wert auf 0 setzen, wird der Smart Alarm wieder aktiviert
- `startDrill` (wo) Testalarm ausführen

### AalEmergency
Bereitgestellt von AAL Smart Emergency Button Control.

- `status` (ro) die ID des aktuellen Status
    - 0 = läuft, normaler Betrieb, wartet auf Notdruck
    - 1 = Alarm ausgelöst
    - 2 = Eingang in Konfiguration zurücksetzen aktiviert, Steuerung wird heruntergefahren
    - 3 = App hat die Steuerung vorübergehend deaktiviert
- `disableEndTime` (ro) Endzeit für die Deaktivierung des Steuerelements
- `resetActive` (ro) Textstatus mit dem aktiven Reset-Eingang (wenn die Steuerung zurückgesetzt wird)
- `trigger` (wo) löst einen Alarm aus der App aus
- `quit` (wo) beendet einen aktiven Alarm
- `disable` (wo) deaktiviert die Steuerung für die angegebene Zeit in Sekunden. Auf 0 setzen, um die Steuerung erneut zu starten, wenn sie deaktiviert ist

### Alarm
Bereitgestellt von Burgler Alarm Control.

- "bewaffneter" (rw) boolescher Zustand (wahr / falsch) des Alarms; Wenn Sie "true" auf diesen Wert schreiben, wird der Alarm sofort eingeschaltet (ohne die vordefinierte Verzögerung).
- `nextLevel` (ro) die ID der nächsten Alarmstufe
    - 1 = Lautlos
    - 2 = akustisch
    - 3 = optisch
    - 4 = intern
    - 5 = extern
    - 6 = Fernbedienung
- `nextLevelDelay` (ro) die Verzögerung des nächsten Levels in Sekunden
- `nextLevelDelayTotal` (ro) die Gesamtverzögerung des nächsten Levels in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
    - 1 = Lautlos
    - 2 = akustisch
    - 3 = optisch
    - 4 = intern
    - 5 = extern
    - 6 = Fernbedienung
- `startTime` (ro) der Zeitstempel beim Starten des Alarms
- `bewaffnete Verzögerung` (ro) die Verzögerung der Alarmsteuerung, die aktiviert wird
- `bewaffnetDelayTotal` (ro) die Gesamtverzögerung der Alarmsteuerung, die scharfgeschaltet wird
- "Sensoren" (ro) die Liste der Sensoren
- `disabledMove` (rw) die Bewegung ist deaktiviert (true) oder nicht (false)
- `delayOn` (wo), wenn ein Wert in diesen Zustand geschrieben wird, aktiviert den Alarm mit der konfigurierten Verzögerung
- `quit` (wo) das Schreiben eines Wertes in diesen Zustand bestätigt den Alarm

### Zentraler Alarm
Wird von der zentralen Burgler-Alarmsteuerung bereitgestellt.

- "bewaffneter" (rw) boolescher Zustand (wahr / falsch) des Alarms; Wenn Sie "true" auf diesen Wert schreiben, wird der Alarm sofort eingeschaltet (ohne die vordefinierte Verzögerung).
- `delayOn` (wo), wenn ein Wert in diesen Zustand geschrieben wird, aktiviert den Alarm mit der konfigurierten Verzögerung
- `quit` (wo) das Schreiben eines Wertes in diesen Zustand bestätigt den Alarm

### Wecker
Bereitgestellt durch Weckersteuerung.

- `isEnabled` (rw) boolescher Zustand (wahr / falsch) des Weckers
- `isAlarmActive` (ro) boolean (true / false), ob der Alarm gerade klingelt
- `assertNeeded` (ro) boolescher Wert (true / false), ob der Benutzer den Alarm bestätigen muss
- `ringingTime` (ro) Countdown in Sekunden, wie lange der Wecker klingelt, bis er wieder schlummert
- `ringDuration` (rw) Dauer in Sekunden, in der der Wecker klingelt
- `prepareDuration` (rw) Vorbereitungszeit in Sekunden
- `snoozeTime` (ro) Sekunden bis das Schlummern endet
- `snoozeDuration` (rw) Dauer in Sekunden nach dem Schlafengehen
- `snooze` (wo), wenn ein Wert in diesen Zustand geschrieben wird, schaltet den aktuellen Alarm aus
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der aktuelle Alarm gelöscht

### AudioZone
Bereitgestellt von Music Server Zone.

- `serverState` (ro) Status des Musikservers:
    - -3 = unbekannte / ungültige Zone
    - -2 = nicht erreichbar
    - -1 = unbekannt
    - 0 = offline
    - 1 = Initialisieren (Booten, versuchen, es zu erreichen)
    - 2 = online
- `playState` (rw) der Wiedergabestatus:
    - -1 = unbekannt (dieser Wert kann nicht eingestellt werden)
    - 0 = gestoppt (durch Einstellen dieses Werts wird die Wiedergabe angehalten)
    - 1 = angehalten (durch Einstellen dieses Werts wird die Wiedergabe angehalten)
    - 2 = Wiedergabe (durch Einstellen dieses Werts wird die Wiedergabe gestartet / fortgesetzt)
- `clientState` (ro) Status des Clients:
    - 0 = offline
    - 1 = Initialisieren (Booten, versuchen, es zu erreichen)
    - 2 = online
- `power` (rw), ob die Client-Leistung aktiv ist oder nicht
- `Lautstärke` (rw) aktuelle Lautstärke
- `maxVolume` (ro) Zonen können eine maximale Lautstärke zugewiesen werden
- `shuffle` (rw), ob das Mischen von Wiedergabelisten aktiviert ist oder nicht
- `sourceList` (ro) Liste mit allen Zonenfavoriten
- Wiederholungsmodus "Wiederholen" (rw):
    - -1 = unbekannt
    - 0 = aus
    - 1 = alles wiederholen
    - 2 = -nicht verwendet-
    - 3 = aktuelles Element wiederholen
- `songName` (ro) Songname
- `Dauer` (ro) wie lang der gesamte Track ist, -1 wenn nicht bekannt (Stream)
- `progress` (rw) aktuelle Position in der Spur
- `album` (ro) Albumname
- Name des Künstlers (ro)
- Name der Station (ro)
- `Genre` (ro) Genre-Name
- `Cover` (ro) Song / Album Cover Bild URL
- `source` (rw) aktuell ausgewählte Quellenkennung (siehe` sourceList` oben)
- `prev` (wo) das Schreiben eines Wertes in diesen Zustand wechselt zum vorherigen Titel
- `next` (wo), wenn ein Wert in diesen Zustand geschrieben wird, wechselt zum nächsten Titel

### Zentrales Audio
Wird vom zentralen Musikserver bereitgestellt.

- `control` (wo) legt den Spielstatus aller Spieler fest (` true` = play, `false` = pause)

### Farbwähler
Dieses Gerät wird nur in einem LightController angezeigt.

- `red` (rw) Rotwert des Farbwählers
- `grün` (rw) grüner Wert des Farbwählers
- `blue` (rw) blue Wert des Farbwählers

Wenn Sie einen oder mehrere der oben genannten Zustände von ioBroker aus festlegen, wird erst nach ca. 100 ms ein Befehl an den Miniserver gesendet.
Dies soll verhindern, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Colorpicker V2
Dieses Gerät wird nur in einem Light Controller V2 in Loxone-Softwareversion 9 und höher angezeigt.

- `red` (rw) Rotwert des Farbwählers
- `grün` (rw) grüner Wert des Farbwählers
- `blue` (rw) blue Wert des Farbwählers

Wenn Sie einen oder mehrere der oben genannten Zustände von ioBroker aus festlegen, wird erst nach ca. 100 ms ein Befehl an den Miniserver gesendet.
Dies soll verhindern, dass sich die Farbe für eine einzelne Benutzereingabe mehrmals ändert.

### Dimmer
Zur Verfügung gestellt von Dimmern.

- `Position` (rw) aktuelle Position für den Dimmer
- `min` (ro) aktueller Mindestwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der Dimmer auf die letzte bekannte Position gesetzt
- `off` (wo) Schreiben eines Wertes in diesen Zustand deaktiviert den Dimmer, setzt die Position auf 0, merkt sich aber die letzte Position

### EIBDimmer
Bereitgestellt von EIB / KNX-Dimmern.

- `Position` (rw) aktuelle Position für den Dimmer
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der Dimmer auf die letzte bekannte Position gesetzt
- `off` (wo) Schreiben eines Wertes in diesen Zustand deaktiviert den Dimmer, setzt die Position auf 0, merkt sich aber die letzte Position

### Tor
Bereitgestellt durch Torsteuerungen.

- `position` (ro) die Position von 1 = bis 0 = unten
- "aktive" (rw) Stromrichtung der Torbewegung
    - -1 = schließen
    - 0 = bewegt sich nicht
    - 1 = offen
- `PreventOpen` (ro) ob das Öffnen der Tür verhindert wird
- `PreventClose` (ro) ob das Schließen der Tür verhindert wird

### Zentrales Tor
Bereitgestellt durch zentrale Torsteuerung.

- `open` (wo) öffnet alle Tore
- `close` (wo) schließt alle Tore
- `stop` (wo) stoppt alle Torantriebe

### InfoOnlyDigital
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `aktiver` (ro) boolescher Zustand (wahr / falsch) des Steuerelements
- `active-text` (ro) falls konfiguriert, das Textäquivalent des Status
- `active-image` (ro), falls konfiguriert, das Bildäquivalent des Status
- `active-color` (ro), falls konfiguriert, das Farbäquivalent des Status

![InfoOnlyDigital Einstellungen](../../../en/adapterref/iobroker.loxone/doc/loxone-config-info-only-digital.png)

### InfoOnlyAnalog
Bereitgestellt durch virtuelle Zustände sowie den Loxone Touch-Schalter.

- `value` (ro) der Zustandswert (Nummer) der Steuerung
- `value-formatated` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des" Unit "-Formats von Loxone Config)

### Gegensprechanlage
Wird von Türsteuerungen bereitgestellt.

- `bell` (ro) ob die Glocke läutet
- `lastBellEvents` (ro) Array mit den Zeitstempeln für jede Glockenaktivität, die nicht beantwortet wurde
- `version` (ro) Nur Loxone Intercoms - Text, der die aktuell installierte Firmware enthält

    Versionen

- Wenn Sie einen Wert in diesen Zustand schreiben, wird die Glocke deaktiviert

Diese Art von Kanal kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Intelligente Raumsteuerung V2
Bereitgestellt von der intelligenten Raumsteuerung V2 seit Miniserver 10.0.

TODO: Dokumentation fehlt derzeit

### Jalousie
Bereitgestellt durch verschiedene Arten von Jalousien (automatisch und manuell).

- `up` (rw) ob Jalousie aufsteigt
- `down` (rw) ob Jalousie sich nach unten bewegt
- `Position` (ro) Position des Jalousie, eine Zahl von 0 bis 1
    - Jalousie obere Position = 0
    - Jalousie untere Position = 1
- `shadowPosition` (ro) Schattenposition der Jalousie (Jalousien), eine Zahl von 0 bis 1
    - Jalousien sind nicht schattiert = 0
    - Jalousien sind schattiert = 1
- `securityActive` (ro) wird nur von Personen mit Autopilot verwendet. Dies stellt die Sicherheitsabschaltung dar
- `autoAllowed` (ro) wird nur von Personen mit Autopilot verwendet
- `autoActive` (rw) wird nur von Personen mit Autopilot verwendet
- `gesperrt` (ro) nur von Personen mit Autopilot, dies repräsentiert die Ausgabe-QI in Loxone Config
- "infoText" (ro) informiert z.B. darüber, was den gesperrten Zustand verursacht hat oder was dazu geführt hat, dass die Sicherheit aktiv wurde.
- `fullUp` (wo) das Schreiben eines Wertes in diesen Zustand löst eine vollständige Aufwärtsbewegung aus
- `fullDown` (wo) das Schreiben eines Wertes in diesen Zustand löst eine vollständige Abwärtsbewegung aus
- `shadow` (wo) Wenn Sie einen Wert in diesen Zustand schreiben, wird der Jalousie in die perfekte Position gebracht

### Central Jalousie
Bereitgestellt von der Zentraljalousiensteuerung.

- `autoActive` (rw) wird nur von Personen mit Autopilot verwendet
- `fullUp` (wo) das Schreiben eines Wertes in diesen Zustand löst eine vollständige Aufwärtsbewegung aus
- `fullDown` (wo) das Schreiben eines Wertes in diesen Zustand löst eine vollständige Abwärtsbewegung aus
- `Schatten` (wo) schreibt einen beliebigen Wert in diesen Zustand Schatten aller Jalousien in die perfekte Position

### Lichtsteuerung
Bereitgestellt von (Hotel-) Lichtsteuerungen.
Szenen können nur in den Loxone-Anwendungen geändert, aber in ioBroker ausgewählt werden.

- `activeScene` (rw) aktuelle Nummer der aktiven Szene
    - 0: alles aus
    - 1..8: Benutzerdefinierte Szene (Definition / Lernen von Szenen muss mit den Loxone-Werkzeugen erfolgen)
    - 9: alles an
- `sceneList` (ro) Liste aller Szenen
- `plus` (wo) wechselt zur nächsten Szene
- `minus` (wo) wechselt zur vorherigen Szene

Diese Art von Kanal kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Lichtsteuerung V2
Bereitgestellt von (Hotel-) Lichtsteuerungen in Loxone Software Version 9 und höher.
Stimmungen können nur in den Loxone-Anwendungen geändert, aber in ioBroker ausgewählt und kombiniert werden.

- `MoodList` (ro) Liste aller konfigurierten Stimmungsnamen
- `activeMoods` (rw) aktuell aktive Liste der Stimmungsnamen
- `favorMoods` (ro) Liste der Lieblingsstimmungsnamen
- `zusätzlicheMoods` (ro) Liste der nicht bevorzugten Stimmungsnamen
- `plus` (wo) wechselt zur nächsten Stimmung
- `minus` (wo) wechselt zur vorherigen Stimmung

Diese Art von Kanal kann andere Geräte enthalten. Weitere Informationen finden Sie im jeweiligen Kapitel.

### Zentrale Lichtsteuerung
Wird von einer zentralen Lichtsteuerung bereitgestellt.

- `control` (wo) schaltet alle Lichter ein oder aus

### Briefkasten
Bereitgestellt von Paketsafe Air / Tree.

- `notificationsDisabledInput` (ro) Status der Eingabe für deaktivierte Benachrichtigungen
- `packetReceived` (ro) Gibt an, ob ein Paket empfangen wurde
- `mailReceived` (ro) Geben Sie an, ob E-Mails empfangen wurden
- `disableEndTime` (ro) Zeitstempel, bis die Benachrichtigungen deaktiviert sind
- `verifyPacket` (wo) Bestätigt den Empfang eines Pakets
- `verifyMail` (wo) Bestätigt den Empfang der Mail
- `disableNotifications` (wo) Deaktiviere die Benachrichtigungen für x Sekunden; 0 Sekunden zum Abbrechen des Timers

### Meter
Bereitgestellt von Stromzählern.

- `actual` (ro) der tatsächliche Wert (Zahl)
- `actual-formatated` (ro) falls konfiguriert, der formatierte Istwert des Status (unter Verwendung des" Unit "-Formats von Loxone Config)
- `total` (ro) der Gesamtwert (Anzahl)
- `total-formatated` (ro) falls konfiguriert, der formatierte Gesamtwert des Status (unter Verwendung des" Unit "-Formats von Loxone Config)
- `reset` (wo) Schreiben eines Wertes in diesen Zustand setzt den Gesamtwert zurück

### Präsenzmelder
Wird vom Präsenzmelder bereitgestellt.

- "aktiver" (ro) Anwesenheitszustand
- "gesperrter" (ro) gesperrter Zustand
- `Ereignisse` (ro) die Anzahl der Ereignisse
- `infoText` (ro) Grund, warum der Anwesenheitsdetektor gesperrt ist

### Druckknopf
Wird durch virtuelle Drucktasteneingaben bereitgestellt.

- `active` (rw) der aktuelle Status der Drucktaste
- Wenn Sie einen Wert in diesen Zustand schreiben, wird simuliert, dass die Taste nur für eine sehr kurze Zeit gedrückt wird

### Schieberegler
Bereitgestellt durch analoge virtuelle Eingänge.

- `value` (rw) der aktuelle Wert des Schiebereglers
- `value-formatated` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des" Unit "-Formats von Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an

### Rauchmelder
Bereitgestellt von Stromzählern.

- `nextLevel` (ro) die ID der nächsten Alarmstufe
    - 1 = Lautlos
    - 2 = akustisch
    - 3 = optisch
    - 4 = intern
    - 5 = extern
    - 6 = Fernbedienung
- `nextLevelDelay` (ro) Verzögerung des nächsten Levels in Sekunden
- `nextLevelDelayTotal` (ro) Gesamtverzögerung des nächsten Levels in Sekunden
- `level` (ro) die ID der aktuellen Alarmstufe
    - 1 = Lautlos
    - 2 = akustisch
    - 3 = optisch
    - 4 = intern
    - 5 = extern
    - 6 = Fernbedienung
- "Sensoren" (ro) die Liste der Sensoren
- `acousticAlarm` (ro) -Zustand des akustischen Alarms false für nicht aktiv und true für aktiv
- `testAlarm` (ro) ob testalarm aktiv ist
- `alarmCause` (ro) die Ursache des Alarms:
    - 1 = nur Rauchmelder
    - 2 = nur Wasser
    - 3 = Rauch und Wasser
    - 4 = nur Temperatur
    - 5 = Feuer und Temperatur
    - 6 = Temperatur und Wasser
    - 7 = Feuer, Temperatur und Wasser
- `startTime` (ro) Zeitstempel beim Starten des Alarms
- `timeServiceMode` (rw) Verzögerung bis der Servicemodus deaktiviert ist
- `stumm` (wo) Wenn Sie einen Wert in diesen Zustand schreiben, wird die Sirene stummgeschaltet
- `quit` (wo) das Schreiben eines Wertes in diesen Zustand bestätigt den Rauchmelder

### Schalter
Wird von virtuellen Eingangsschaltern bereitgestellt.

- `active` (rw) der aktuelle Zustand des Schalters

### Textstatus
Bereitgestellt von "Staat".

- `textAndIcon` (ro) der aktuelle Wert des Status

### TimedSwitch
Zur Verfügung gestellt von Treppenhaus und Multifunktionsschaltern.

- `deactivationDelayTotal` (ro) Sekunden, wie lange der Ausgang aktiv ist, wenn der Timer verwendet wird
- Countdown "Deaktivierung Verzögerung" (ro), bis der Ausgang deaktiviert wird
    - 0 = der Ausgang ist ausgeschaltet
    - -1 = der Ausgang ist permanent eingeschaltet
    - Andernfalls wird der Wert von deactivationDelayTotal heruntergezählt
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der Schalter dauerhaft ohne Deaktivierungsverzögerung aktiviert
- Wenn Sie einen Wert in diesen Zustand schreiben, wird der Schalter deaktiviert
- `puls` (wo) pulsiert den Schalter:
    - Deaktivierungsverzögerung = 0
        - Startet den Countdown von deactivationDelayTotal bis 0
    - Wenn dies ein Treppenhausschalter ist:
        - Deaktivierungsverzögerung = -1
            - Keine Wirkung, bleibt dauerhaft eingeschaltet.
        - Deaktivierungsverzögerung> 0
            - Startet den Countdown neu
    - wenn dies ein Multifunktionsschalter ist
        - schaltet es aus (vom Countdown oder permanent eingeschaltet)

### Tracker
Zur Verfügung gestellt von Treppenhaus und Multifunktionsschaltern.

- `entry` (ro) Liste der vom Miniserver zurückgegebenen Einträge

### UpDownAnalog
Bereitgestellt durch virtuellen Eingang (Auf-Ab-Tasten).

- `value` (rw) der aktuelle Wert des Eingangs
- `value-formatated` (ro) falls konfiguriert, der formatierte Wert des Status (unter Verwendung des" Unit "-Formats von Loxone Config)
- `error` (ro) zeigt einen ungültigen Wert des Schiebereglers an

### ValueSelector
Werteauswahl.

- `value` (rw) aktueller Wert
- `min` (ro) aktueller Mindestwert
- `max` (ro) aktueller Maximalwert
- `step` (ro) aktueller Schrittwert

### WindowMonitor
Bereitgestellt von Stromzählern.

- `numOpen` (ro) Anzahl offener Fenster und Türen
- `numClosed` (ro) Anzahl geschlossener Fenster und Türen
- `numTilted` (ro) Anzahl der gekippten Fenster und Türen
- `numOffline` (ro) Anzahl der Fenster und Türen, die nicht verfügbar sind
- `numLocked` (ro) Anzahl der verschlossenen Fenster und Türen
- `numUnlocked` (ro) Anzahl der entsperrten Fenster und Türen

Die Summe der Werte aus all diesen Zuständen entspricht der Anzahl der überwachten Fenster und Türen. Die Fenster / Türen mit zwei Zuständen werden immer zum "schlechtesten" Zustand gezählt.

Für jedes überwachte Fenster / jede überwachte Tür gibt es ein Gerät mit einem Index als ID und dem angegebenen Namen. Sie haben die folgenden Zustände:

- `geschlossen` (ro) das Fenster / die Tür ist geschlossen
- "gekippt" (ro) das Fenster / die Tür ist gekippt
- `open` (ro) das Fenster / die Tür ist offen
- `verriegelt` (ro) das Fenster / die Tür ist verschlossen
- `entriegelt` (ro) das Fenster / die Tür ist entriegelt

## Wetterserver
Die Wetterserverinformationen werden als Gerät mit mehreren Kanälen bereitgestellt.
Das Gerät heißt `WeatherServer`.
Es beinhaltet:

- der Kanal "Ist" mit den aktuellen Wetterwerten
- ein Kanal für jede Prognosestunde namens "HourXX", wobei "XX" die Anzahl der Stunden in der Zukunft ist

Jeder Kanal enthält die folgenden Zustände:

- `barometricPressure`: numerischer Luftdruckwert
- `barometricPressure-formatiert`: formatierter Luftdruckwert mit Einheit
- `dewPoint`: numerischer Taupunktwert
- `dewPoint-formatiert`: formatierter Taupunktwert mit Einheit
- "wahrgenommene Temperatur": numerischer wahrgenommener Temperaturwert
- "wahrgenommene Temperatur formatiert": formatierter wahrgenommener Temperaturwert mit Einheit
- "Niederschlag": numerischer Niederschlagswert
- "niederschlagsformatiert": formatierter Niederschlagswert mit Einheit
- "relative Luftfeuchtigkeit": numerischer Wert für die relative Luftfeuchtigkeit
- `relativeHumidity-formatiert`: formatierter relativer Feuchtigkeitswert mit Einheit
- `solarRadiation`: Wert der Sonnenstrahlung
- `Temperatur`: numerischer Temperaturwert
- `temperaturformatiert`: formatierter Temperaturwert mit Einheit
- `timestamp`: Zeitstempel der Daten als` value.time` (JavaScript-Zeit)
- `weatherType`: numerischer Aufzählungswert für den Wettertyp
- `weatherType-text`: Textdarstellung des Wettertyps
- `windDirection`: Windrichtungswert
- `windSpeed`: Windgeschwindigkeitswert
- `windSpeed-formatiert`: formatierter Windgeschwindigkeitswert mit Einheit

## Nicht unterstützte Steuerungsarten
Wenn Loxone neue Steuerelementtypen hinzufügt, werden diese von diesem Adapter meist nicht sofort unterstützt.

In diesem Fall hat das Steuerelement "Unbekannt:" vor seinem Namen. Z.B. `Unknown: Wallbox`

Diese Steuerelemente enthalten alle vom Miniserver gemeldeten Status, sind jedoch alle schreibgeschützte Zeichenfolgen.

Wenn Sie eine bessere Unterstützung für einen neuen Steuerelementtyp benötigen, befolgen Sie die Schritte im nächsten Abschnitt, um eine neue Funktion festzulegen.

** Sentry: ** Nicht unterstützte Steuerelementtypen werden den Entwicklern mit Sentry gemeldet. Auf diese Weise erhalten Sie möglicherweise in der nächsten Version neue Steuerelemente, ohne diese selbst anfordern zu müssen.

## Fehlerberichte und Funktionsanforderungen
Bitte verwenden Sie das GitHub-Repository, um Fehler zu melden oder neue Funktionen anzufordern.

Wenn Sie einen nicht unterstützten Steuerelementtyp benötigen, geben Sie den Namen an, wie er im Fehlerprotokoll von ioBroker angegeben ist, sowie den gesamten Rohinhalt des Geräts im ioBroker-Objektbaum:

Beispiel für eine Protokolldatei für "LightController":

![Protokoll der fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/log-missing-control-type.png)

Nativer Wert von ioBroker &gt; Objekte

![Details zur fehlenden LightController-Steuerung](../../../en/adapterref/iobroker.loxone/doc/details-missing-control-type.png)

## Legal
Dieses Projekt ist weder direkt noch indirekt mit der Firma Loxone Electronics GmbH verbunden.

Loxone und Miniserver sind eingetragene Marken der Loxone Electronics GmbH.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.2.1 (2021-05-18)

-   (UncleSamSwiss) Fixed typo causing "Cannot read property 'off' of undefined" (IOBROKER-LOXONE-2R, #72)
-   (UncleSamSwiss) Improved Sentry reporting for structure file

### 2.2.0 (2021-05-17)

-   (UncleSamSwiss) Unknown/unsupported controls are now shown with their states as read-only strings
-   (raintonr) Fixes for auto-position based on percentage (#76)
-   (raintonr) Added support for IRoomControllerV2 (#22)
-   (UncleSamSwiss) Added experimental support for EIBDimmer (#15)
-   (UncleSamSwiss) Added support for ValueSelector (#36)
-   (UncleSamSwiss) Added support for TextState (#73)
-   (UncleSamSwiss) Added support for UpDownAnalog (#57)
-   (UncleSamSwiss) Fixed some "State has wrong type" warnings (#99, #128)
-   (UncleSamSwiss) Added support for Lumitech color picker (#44)
-   (UncleSamSwiss) Weather server data can now be filtered (#131)
-   (UncleSamSwiss) Added support for PresenceDetector (IOBROKER-LOXONE-1R)
-   (UncleSamSwiss) Added support for AAL Smart Alarm (IOBROKER-LOXONE-1X)
-   (UncleSamSwiss) Added support for AAL Emergency Button (IOBROKER-LOXONE-1W)
-   (UncleSamSwiss) Added support for Paketsafe (IOBROKER-LOXONE-1P)

### 2.1.0 (2020-12-21)

-   (raintonr) Fixed: activeMoods can get stuck/not sync properly; all events is now handled with a queue (#58, #61, #62)
-   (raintonr) Added open/close buttons to Garage/Gate Control (#59, #60)
-   (pinkit) Added support for virtual text inputs (#48)
-   (UncleSamSwiss) Updated to the latest adapter template
-   (UncleSamSwiss) Changed log level of "Currently unsupported control type" message to "info" (#65)

### 2.0.2 (2020-10-26)

-   (UncleSamSwiss) Fixed color picker updates (#52)
-   (UncleSamSwiss) TimedSwitch to have `on`/`off` instead of `active` (#53)
-   (UncleSamSwiss) Cleaning illegal characters for room and function names (#54)

### 2.0.1 (2020-09-24)

-   (UncleSamSwiss) Fixed percentage states always showing 0% (#49)
-   (UncleSamSwiss) Fixed analog virtual inputs wouldn't set the value 0 from ioBroker (#47)
-   (UncleSamSwiss) Added translations to package information.

### 2.0.0

-   **BREAKING:** Since the password is now encrypted, you will need to enter the password again after an update to this version!
-   (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language

### 1.1.0

-   (UncleSamSwiss) Added support for Miniserver Gen 2
-   (sstroot) RGB for LightControllerV2
-   (Apollon77) Updated CI Testing

### 1.0.0

-   (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
-   (alladdin) Fixed connection issues with Loxone Miniserver 10
-   (UncleSamSwiss) Changed all write-only "switch"es to "button"s
-   (UncleSamSwiss) Added support for AlarmClock control
-   (Apollon77) Updated CI Testing

### 0.4.0

-   (UncleSamSwiss) Improved support for Loxone Config 9
-   (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0

-   (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1

-   (UncleSamSwiss) Added support for Slider control

### 0.2.0

-   (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1

-   (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0

-   (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3

-   (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2

-   (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1

-   (UncleSamSwiss) Initial version

## License

Copyright 2021 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.