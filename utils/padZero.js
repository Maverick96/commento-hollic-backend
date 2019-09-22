const paddingSize = require('../config/constants').paddingSize;

function padZero(id) {
    id = id.toString();
    while (id.length < paddingSize) {
        id = '0' + id;
    }
    return id;
}

module.exports = padZero;