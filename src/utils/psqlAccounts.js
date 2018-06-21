const { Client } = require('pg')

const client = new Client({
    database: 'kurssikartta'
})
client.connect()

const getAccount = async (username) => {
    const query = {
        text: 'SELECT * FROM accounts WHERE username = $1',
        values: [username]
    }
    console.log('executing the query')
    const result = await client.query(query)

    return result.rows[0]

}

module.exports = {
    getAccount
}