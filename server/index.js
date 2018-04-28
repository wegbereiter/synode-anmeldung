const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const historyApiFallback = require('express-history-api-fallback');
const webpack = require('webpack');
const pathUtil = require('path');
const commander = require('commander');
const GoogleApi = require('./googleApi');

commander
    .version('0.0.2')
    .option('-p, --port [port]', 'Port', 80)
    .option('-s, --sheet [sheetId]', 'The ID for the spread sheet')
    .option('-u, --user [userEmail]', 'The E-Mail for the google API user')
    .option('-k, --key [privateKey]', 'The private key for the google API user')
    .option('-d, --dir [path]', 'The path to the application directory')
    .parse(process.argv);

const app = express();
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

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
            .then(count => res.status(200).send(JSON.stringify({count})))
            .catch(e => res.status(500).send(e.message));
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
