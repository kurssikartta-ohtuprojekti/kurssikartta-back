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

const saveAccount = async (account) => {
    const query = {
        text: 'INSERT INTO accounts VALUES ($1, $2, $3, $4)',
        values: [account.id, account.username, account.passwordhash, account.role]
    }

   const result = await client.query(query)
  // add error handling

}

module.exports = {
    getAccount, saveAccount
}