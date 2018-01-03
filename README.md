# Synode 

Dies ist die Anmelde-Seite für Synode der Wegbereiter.
Anmeldungen werden in eine Google-Docs Tabelle gespeichert.
Um die Applikation auszuführen gibt es mehrere Möglichkeiten:

## Node

Hierfür muss node.js auf dem Server installiert sein.
- Applikation auf dem Server auschecken
- Im Hauptverzeichnis `npm run build` ausführen
- Server starten mit `npm start -- -s {google docs sheet id} -p {port}`

yarn start:server -- -d dist -s ${TARGET_SHEET} -u ${GOOGLE_USER} '--key=\"${GOOGLE_KEY}\"'"

## Docker

Dieses Repository kommt mit einer `Dockerfile` um ein entsprechendes image zu erzeugen.
Dazu wird ein Dockerfähiger Server benötigt und Docker muss auf dem Rechner eingerichtet sein.
Für windows muss ggf. die ubuntu bash aktiviert werden.
- `./scripts/build.sh` ausführen
- Container für das generierte image `wegbereiter/synode-anmeldung` auf dem Server starten

Folgende Umgebungsvariablen müssen konfiguriert werden:
- **TARGET_SHEET:** Die ID der Google Docs Tabelle in der die Anmeldungen gespeichert werden
sollen (kann aus der URL entnommen werden: https://docs.google.com/spreadsheets/d/{ID}/edit)
- **GOOGLE_USER:** Siehe unten
- **GOOGLE_KEY:** Siehe unten

## Weiteres

In beiden Varianten muss sichergestellt sein, das der Server im Hintergrund läuft und
das er im Falle eines Fehlers neu gestartet wird.

# Google Docs
Statt einer Datenbank verwendet dieses Tool eine einfache Google Docs Tabelle.
Dazu muss folgendes sichergestellt sein:
1. Unter https://console.cloud.google.com muss ein Projekt angelegt werden
2. Das Projekt erhält automatisch eine ID. Der Google-User (siehe oben) entspricht
folgendem Schema: <Project-ID>@appspot.gserviceaccount.com
3. Als nächstes wird ein Private-Key zur Authentifizierung benötigt:
    1. Projekt-Einstellungen aufrufen
    2. Menüpunkt "Dienstkonten" aufrufen
    3. In der letzten Spalte der Tabellenzeile von "App Engine default service account"
    auf die 3 Punkte klicken, dann auf "Schlüssel erstellen"
    4. Als Format JSON auswählen und "Erstellen" klicken
    5. Die heruntergeladene Datei mit einem Texteditor öffnen
    6. Der Wert von "private_key" ist der gesuchte Wert (ohne Anführungszeichen, beginnt mit `-----BEGIN PRIVATE KEY-----\n`)
4. Nun kann eine Tabelle in Google Docs mit folgenden Spalten angelegt werden
    - Datum
    - Name
    - E-Mail
    - Straße
    - PLZ
    - Ort
    - Land
    - Handy-Nummer
    - Allergien
    - Geburtstag
    - NPC
    - IT-Name
    - Siegel
    - Zimmerwunsch
    - AGB
5. Nun muss die Tabelle für den oben definierten Benutzer für die Bearbeitung freigegeben
werden 
