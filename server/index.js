const express = require('express');
const bodyParser = require('body-parser');
const historyApiFallback = require('express-history-api-fallback');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const commander = require('commander');
const GoogleApi = require('./googleApi');

commander
    .version('0.0.1')
    .option('-p, --port [port]', 'Port', 80)
    .option('-s, --sheet [sheetId]', 'The ID for the spread sheet')
    .parse(process.argv);

const api = new GoogleApi(require('./credentials.json'), '1sNy_b6ybxa5q0sosPHELd8NICqf223Cth0ppAVwOZh8');
const app = express();
const env = process.env.NODE_ENV || 'development';


if (env === 'development') {
    const config = require('../config/webpack.dev')(env);
    app.use(webpackMiddleware(webpack(config), config.devServer));
}

if (env === 'production') {
    const root = __dirname + '/../dist';
    app.use(express.static(root));
    app.use(historyApiFallback('index.html', {root}))
}

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    api.authenticate()
        .then(() => api.register(req.body))
        .then(() => res.status(200).send('Success!'))
        .catch((e) => res.status(500).send(e));
});

app.listen(commander.port, () => {
    console.log(`Listening to port ${commander.port}!`);
});
