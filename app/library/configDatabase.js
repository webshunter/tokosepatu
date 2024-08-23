const fs = require('fs');
const path = require('path');

let statusFile = null;

const filePath = path.join('config.json');

if(fs.existsSync(filePath)){
    let n = JSON.parse(fs.readFileSync(filePath));
    if(n.status === "production"){
        statusFile = true;
    }
}

const statusDev = process.env.NODE_ENV;

const DB_CONF = !statusFile  ? {
    host: '193.203.167.219',
    user: 'rumahjo',
    password: 'rumahjo$123$',
    database: 'rjo',
    multipleStatements: true
} : {
    host: '193.203.167.219',
    user: 'rumahjo',
    password: 'rumahjo$123$',
    database: 'rjo',
    multipleStatements: true
};

export { DB_CONF, statusFile as statusProduction}