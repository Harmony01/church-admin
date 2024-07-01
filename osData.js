const os = require('os')

const hostName = os.hostname();

const osData = {
    deviceName: hostName
}

module.exports =osData;