const path = require('path');
const ROOT = path.resolve(__dirname, '..');

module.exports = {
    hasProcessFlag(flag) {
        return process.argv.join('').indexOf(flag) > -1;
    },

    isWebpackDevServer() {
        return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
    },

    root(args) {
        args = Array.prototype.slice.call(arguments, 0);
        return path.join.apply(path, [ROOT].concat(args));
    },
};
