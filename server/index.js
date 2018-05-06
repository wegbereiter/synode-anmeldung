require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const historyApiFallback = require('express-history-api-fallback');
const webpack = require('webpack');
const pathUtil = require('path');
const commander = require('commander');
const GoogleApi = require('./googleApi');


commander
    .version('1.0.0')
    .option('-p, --port [port]', 'Port', process.env.PORT || 80)
    .option('-s, --sheet [sheetId]', 'The ID for the spread sheet', process.env.SHEET)
    .option('-u, --user [userEmail]', 'The E-Mail for the google API user', process.env.GOOGLE_USER)
    .option('-k, --key [privateKey]', 'The private key for the google API user', process.env.GOOGLE_KEY)
    .option('-d, --dir [path]', 'The path to the application directory', process.env.DIRECTORY)
    .option('-b, --pcs [number]', 'The maximum number of pc beds', process.env.BEDS_PC || 0)
    .option('-n, --npcs [number]', 'The maximum number of npc beds', process.env.BEDS_NPC || 0)
    .option('-a, --age [number]', 'The minimum age of players', process.env.MIN_AGE || 0)
    .option('--start [yyyy-mm-dd]', 'The start date', process.env.START_DATE)
    .option('--end [yyyy-mm-dd]', 'The end date', process.env.END_DATE)
    .option('--name [string]', 'Name of con', process.env.CON_NAME)
    .option('--subname [string]', 'Sub title of con', process.env.CON_NAME_SUB)
    .option('--description [string]', 'Name of con', process.env.CON_DESCRIPTION)
    .option('--type [string]', 'Type of con', process.env.CON_TYPE)
    .option('--location [string]', 'Location of con', process.env.CON_LOCATION)
    .option('--website [string]', 'Location website', process.env.CON_LOCATION_WEBSITE)
    .option('--pcprice [number]', 'PC price', process.env.PRICE_PC)
    .option('--npcprice [number]', 'NPC price', process.env.PRICE_NPC)
    .option('--orga [name|email,name2|email2]', 'Orga list', process.env.CON_ORGA)
    .option('--itrooms [boolean]', 'Orga list', process.env.IT_ROOMS)
    .parse(process.argv);

const app = express();
const env = process.env.NODE_ENV || 'development';

const options = {
    npcBeds: Number(commander.npcs),
    pcBeds: Number(commander.pcs),
    minAge: Number(commander.age),
    start: commander.start,
    end: commander.end,
    name: commander.name,
    subname: commander.subname,
    description: commander.description,
    type: commander.type,
    location: commander.location.split('\n'),
    website: commander.website,
    pcPrice: Number(commander.pcprice),
    npcPrice: Number(commander.npcprice),
    orga: commander.orga
        .split(',')
        .map(entry => entry.split('|'))
        .map(([name, email]) => ({ name, email })),
    itRooms: commander.itrooms === 'true',
};

app.use(bodyParser.json());

app.get('/api/config', (req, res) => {
    res.status(200).json(options);
});

if (commander.key && commander.user && commander.sheet) {
    const key = JSON.parse(commander.key);
    const email = commander.user;
    const sheetId = commander.sheet;

    const api = new GoogleApi({client_email: email, private_key: key}, sheetId);

    app.post('/api/register', (req, res) => {
        api.authenticate()
            .then(() => api.register(req.body))
            .then(() => res.status(200).json({ message: 'success' }))
            .catch(e => res.status(500).json({ message: e.message }));
    });

    app.get('/api/count', (req, res) => {
        api.authenticate()
            .then(() => api.countRows())
            .then(count => res.status(200).json({
                pc: { current: count.pc, remaining: options.pcBeds - count.pc },
                npc: { current: count.npc, remaining: options.npcBeds - count.npc },
            }))
            .catch(e => res.status(500).json({ message: e.message }));
    });
} else {
    console.warn('Warning: /api endpoints are disabled');
}

if (commander.dir) {
    const root = pathUtil.resolve(process.cwd(), commander.dir);
    app.use(compression());
    app.use(express.static(root, {
        maxage: '365d',
    }));
    app.use(historyApiFallback('index.html', { root }))
} else {
    console.warn('Warning: no files will be served via this server');
}

app.listen(commander.port, () => {
    console.log(`Listening to port ${commander.port}!`);
});
