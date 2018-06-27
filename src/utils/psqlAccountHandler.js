const { Client } = require('pg')

const conn = process.env.DATABASE_URL

const client = conn ? new Client({ connectionString: conn }) : new Client({
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

const updateAccountCoursesByName = async (username, courses) => {
    const query = {
        text: 'UPDATE Accounts SET courses = $2 WHERE username = $1',
        values: [username, courses]
    }

    const result = await client.query(query)
    return result.rows[0]

}

const saveAccount = async (account) => {
    const query = {
        text: 'INSERT INTO accounts(username, passwordhash, role) VALUES ($1, $2, $3)',
        values: [account.username, account.passwordhash, account.role]
    }

    const result = await client.query(query)
    // add error handling

}

module.exports = {
    getAccountByName, saveAccount, updateAccountCoursesByName
}