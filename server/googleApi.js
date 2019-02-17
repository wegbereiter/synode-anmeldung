'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const dateRegExp = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const moment = require('moment-timezone');

const columns = {
    name: 'Name',
    email: 'E-Mail',
    street: 'Straße',
    zip: 'PLZ',
    city: 'Ort',
    country: 'Land',
    mobile: 'Handy-Nummer',
    licensePlate: 'KFZ-Kennzeichen',
    diet: 'Ernährung',
    allergies: 'Allergien',
    fears: 'Phobien',
    birthday: 'Geburtstag',
    npc: 'NPC',
    itName: 'IT-Name',
    itPowers: 'Char-Besonderheiten',
    itBedroom: 'Bespieltes Zimmer',
    sigil: 'Siegel',
    room: 'Zimmerwunsch',
    accept: 'AGB',
    minAge: 'Mindestalter',
    comment: 'Kommentar',
};

class GoogleApi {
    constructor(credentials, spreadSheetId) {
        this.credentials = credentials;
        this.spreadSheet = new GoogleSpreadsheet(spreadSheetId);
    }

    authenticate() {
        return new Promise((resolve, reject) => {
            this.spreadSheet.useServiceAccountAuth(this.credentials, error => {
                if (error) {
                    console.error('Authentication error:', error);
                    reject(new Error(error));
                } else {
                    resolve();
                }
            });
        });
    }

    register(person) {
        const data = this.transformData(person);
        console.info('Register person:', data);
        return new Promise((resolve, reject) => {
            this.spreadSheet.addRow(1, data, error => {
                if (error) {
                    console.error('Register error:', error, data);
                    reject(new Error(error));
                } else {
                    resolve();
                }
            });
        });
    }

    countRows() {
        return new Promise((resolve, reject) => {
            this.spreadSheet.getRows(1, {}, (error, rows) => {
                if (error) {
                    console.error('Register error:', error, data);
                    reject(new Error(error));
                } else {
                    resolve({
                        npc: rows.filter(row => String(row['npc']).toLowerCase() === 'ja').length,
                        pc: rows.filter(row => String(row['npc']).toLowerCase() !== 'ja').length,
                    });
                }
            });
        });
    }

    transformData(data) {
        const output = {};
        Object.keys(columns).forEach(key => {
            const targetKey = columns[key];
            output[targetKey] = data[key];

            if (output[targetKey] === null) output[targetKey] = '';

            if (output[targetKey] === false) output[targetKey] = 'Nein';
            else if (output[targetKey] === true) output[targetKey] = 'Ja';
            else if (!output[targetKey].match(dateRegExp))
                output[targetKey] = "'" + output[columns[key]];
        });

        output['Datum'] = moment()
            .tz('Europe/Berlin')
            .format('DD.MM.YYYY, HH:mm');

        return output;
    }
}

module.exports = GoogleApi;
