const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const historyApiFallback = require('express-history-api-fallback');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const commander = require('commander');
const GoogleApi = require('./googleApi');

commander
    .version('0.0.1')
    .option('-p, --port [port]', 'Port', 80)
    .option('-s, --sheet [sheetId]', 'The ID for the spread sheet')
    .option('-u, --user [userEmail]', 'The E-Mail for the google API user')
    .option('-k, --key [privateKey]', 'The private key for the google API user')
    .parse(process.argv);

const app = express();
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

if (env === 'development') {
    const config = require('../config/webpack.dev')(env);
    app.use(webpackMiddleware(webpack(config), config.devServer));
}

if (env === 'production') {
    const root = __dirname + '/../dist';
    app.use(compression());
    app.use(express.static(root, {
        maxage: '365d',
    }));
    app.use(historyApiFallback('index.html', {root}))
}


if (commander.key && commander.user && commander.sheet) {
    const key = JSON.parse(commander.key);
    const email = commander.user;
    const sheetId = commander.sheet;

    const api = new GoogleApi({client_email: email, private_key: key}, sheetId);

    app.post('/register', (req, res) => {
        api.authenticate()
            .then(() => api.register(req.body))
            .then(() => res.status(200).send('Success!'))
            .catch((e) => res.status(500).send(e.message));
    });
} else {
    console.warn('Warning: /register endpoint is disabled');
}

app.listen(commander.port, () => {
    console.log(`Listening to port ${commander.port}!`);
});
