import fs from 'fs';
import path from 'path';

const statusDev = process.env.POSISI;

const file = path.join('config.json');

let statusConfig = null;

if(fs.existsSync(file)){
    let dataJson = JSON.parse(fs.readFileSync(file,'utf8'));
    if (dataJson.status === 'production'){
        statusConfig = true;
    }
}

const DB_CONF = !statusConfig  ? {
    host: '103.152.118.236',
    user: 'gugus',
    password: 'gugus$111$g',
    database: 'rjo',
    multipleStatements: true
} : {
    host: '193.203.167.219',
    user: 'rumahjo',
    password: 'rumahjo$123$',
    database: 'rjo',
    multipleStatements: true
};

export { DB_CONF, statusConfig }