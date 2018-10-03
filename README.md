# Synode

Dies ist die Anmelde-Seite für Synode der Wegbereiter.
Anmeldungen werden in eine Google-Docs Tabelle gespeichert.
Um die Applikation auszuführen gibt es mehrere Möglichkeiten:

## Node

Hierfür muss node.js auf dem Server installiert sein.

-   Applikation auf dem Server auschecken
-   Im Hauptverzeichnis `npm run build` ausführen
-   Server starten mit `npm start -- -s {google docs sheet id} -p {port}`

yarn start:server -- -d dist -s ${TARGET_SHEET} -u ${GOOGLE_USER} '--key=\"${GOOGLE_KEY}\"'"

## Docker

Dieses Repository kommt mit einer `Dockerfile` um ein entsprechendes image zu erzeugen.
Dazu wird ein Dockerfähiger Server benötigt und Docker muss auf dem Rechner eingerichtet sein.
Für windows muss ggf. die ubuntu bash aktiviert werden.

-   `./scripts/build.sh` ausführen
-   Container für das generierte image `wegbereiter/synode-anmeldung` auf dem Server starten

Folgende Umgebungsvariablen müssen bzw. können konfiguriert werden:

-   **SHEET:** Die ID der Google Docs Tabelle in der die Anmeldungen gespeichert werden
    sollen (kann aus der URL entnommen werden: https://docs.google.com/spreadsheets/d/{ID}/edit)
-   **GOOGLE_KEY:** Siehe unten
-   **BEDS_PC:** (default: 0) Anzahl der für Spieler zur Verfügung stehenden Plätze
-   **BEDS_NPC:** (default: 0) Anzahl der für NSCs zur Verfügung stehenden Plätze
-   **MIN_AGE:** (default: 0) Mindest-Alter der Con, wird für die Validierung des Geburtstags verwendet
-   **START_DATE:** (format: yyyy-mm-dd) Startdatum der Con
-   **END_DATE:** (format: yyyy-mm-dd) Enddatum der Con
-   **CON_NAME:** Name der Con (Überschrift)
-   **CON_NAME_SUB:** Untertitel der Con (Steht unter/neben der Überschrift)
-   **CON_DESCRIPTION:** Ausführliche Beschreibung der Con. Kann (und sollte) HTML enthalten
-   **CON_TYPE:** Wird als Typ aufgeführt
-   **CON_LOCATION:** Name und Anschrift der Location
-   **CON_LOCATION_WEBSITE:** Link zur Webseite der Location
-   **PRICE_PC:** Preis in Euro für Spieler
-   **PRICE_NPC:** Preis in Euro für NSCs
-   **CON_ORGA:** (format: name|mail@test.de,name2|mail@test2.de) Organisatoren und deren E-Mail-Adressen (optional)
-   **IT_ROOMS:** (format: true) Soll die Bespielbarkeit der Zimmer ebgefragt werden?
-   **FEARS:** (format: true) Sollen phobien abgefragt werden?

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
    6. Der Inhalt der Datei muss als Umgebungsvariable GOOGLE_KEY angegeben werden
4. Nun kann eine Tabelle in Google Docs mit folgenden Spalten angelegt werden (die Reihenfolge ist egal)
    - Datum
    - Name
    - E-Mail
    - Straße
    - PLZ
    - Ort
    - Land
    - Handy-Nummer
    - KFZ-Kennzeichen
    - Ernährung
    - Allergien
    - Phobien
    - Geburtstag
    - NPC
    - IT-Name
    - Char-Besonderheiten
    - Bespieltes Zimmer
    - Siegel
    - Zimmerwunsch
    - AGB
    - Mindestalter
5. Nun muss die Tabelle für den oben definierten Benutzer für die Bearbeitung freigegeben
   werden
