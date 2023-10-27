// Require and initialize outside of your main handler
const mysql = require('serverless-mysql')({
    config: {
        host: '202.157.177.241',
        user: 'adminjo',
        password: 'ValidJO$5758$',
        database: 'rjo'
    }
})


// Main handler function
export const Query = async (qr) => {
    // Run your query
    let results = await mysql.query(qr)

    // Run clean up function
    await mysql.end()

    // Return the results
    return results
}