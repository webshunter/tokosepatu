const statusDev = process.env.POSISI;

export const DB_CONF = statusDev == 'development' || statusDev == 'test'  ? {
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