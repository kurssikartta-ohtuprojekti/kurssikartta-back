const { Client } = require('pg')


const client = new Client({

    database: (process.env.NODE_ENV === 'test') ? 'kurssikartta_test' : 'kurssikartta'
})

client.connect()


const getAccountByName = async (username) => {
    const query = {
        text: 'SELECT * FROM accounts WHERE username = $1',
        values: [username]
    }
    const result = await client.query(query)

    return result.rows[0]

}

const saveAccount = async (account) => {
    const query = {
        text: 'INSERT INTO accounts VALUES ($1, $2, $3)',
        values: [account.username, account.passwordhash, account.role]
    }

   const result = await client.query(query)
  // add error handling

}

module.exports = {
    getAccountByName, saveAccount
}