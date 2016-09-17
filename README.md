# Synode 

Dies ist die Anmelde-Seite für Synode der Wegbereiter.
Anmeldungen werden in eine Google-Docs Tabelle gespeichert.
Um die Applikation auszuführen gibt es mehrere Möglichkeiten:

## Node

Hierfür muss node.js auf dem Server installiert sein.
- Applikation auf dem Server auschecken
- Im Hauptverzeichnis `npm run build` ausführen
- Server starten mit `npm start -- -s {google docs sheet id} -p {port}`

## Docker

Dieses Repository kommt mit einer `Dockerfile` um ein entsprechendes image zu erzeugen.
Dazu wird ein Dockerfähiger Server benötigt und Docker muss auf dem Rechner eingerichtet sein.
Für windows muss ggf. die ubuntu bash aktiviert werden.
- `./scripts/build.sh` ausführen
- Container für das generierte image `wegbereiter/synode-anmeldung` auf dem Server starten
- `credentials.json` muss gemounted werden

## Weiteres

In beiden Varianten muss sichergestellt sein, das der Server im Hintergrund liegt und
das er im Falle eines Fehlers neu gestartet wird.
