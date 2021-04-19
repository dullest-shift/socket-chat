const moment = require('moment');

function formats(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
module.exports = formats;