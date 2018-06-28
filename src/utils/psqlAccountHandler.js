const { Pool } = require('pg')

const conn = process.env.DATABASE_URL

const pool = conn ? new Pool({ connectionString: conn }) : new Pool({
    database: (process.env.NODE_ENV === 'test') ? 'kurssikartta_test' : 'kurssikartta'
})



const getAccountByName = async (username) => {


    const client = await pool.connect()

    try {
        const query = {
            text: 'SELECT * FROM accounts WHERE username = $1',
            values: [username]
        }
        const result = await client.query(query)

        return result.rows[0]
    }
    catch (error) {
        console.log(error)
    }
    finally {
        client.release()
    }

}

const updateAccountCoursesByName = async (username, courses) => {

    const client = await pool.connect()

    try {
        const query = {
            text: 'UPDATE Accounts SET courses = $2 WHERE username = $1',
            values: [username, courses]
        }

        const result = await client.query(query)
        return result.rows[0]


    }
    catch (error) {
        console.log(error)

    } finally {
        client.release()
    }

}

const saveAccount = async (account) => {

    const client = await pool.connect()

    try {

        const query = {
            text: 'INSERT INTO accounts(username, passwordhash, role, courses) VALUES ($1, $2, $3, \'{}\')',
            values: [account.username, account.passwordhash, account.role]
        }

        await client.query(query)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        client.release()
    }

}

const deleteAccount = async (account) => {

    const client = await pool.connect()

    try {

        const query = {
            text: 'DELETE FROM accounts WHERE username = $1',
            values: [account.username]
        }

        await client.query(query)
    }
    catch (error) {
        console.log(error)
    }
    finally {
        client.release()
    }

}

module.exports = {
    getAccountByName, saveAccount, updateAccountCoursesByName, deleteAccount
}