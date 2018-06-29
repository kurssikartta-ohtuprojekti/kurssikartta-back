/* password */
const PW_MIN_LENGTH = process.env.PW_MIN_LENGTH || 6
const PW_MAX_LENGTH = process.env.PW_MAX_LENGTH || 100
const PW_REQUIRED_REGEXES = [/\d/, /^[a-z0-9_]+$/i] // huom tarkista validoinnit 
/*
/\d/ must contain a number
/^[a-z0-9]+$/i must be alphanumeric, incasesensitive
*/

/* username */
const USERNAME_MIN_LENGTH = process.env.USERNAME_MIN_LENGTH || 3
const USERNAME_MAX_LENGTH = process.env.USERNAME_MAX_LENGTH || 12
const USERNAME_REQUIRED_REGEXES = [/^[a-z0-9_]+$/i] // huom tarkista validoinnit 
/*
/\d/ must contain a number
/^[a-z0-9]+$/i must be alphanumeric, incasesensitive
*/


/* cryptography */

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10

module.exports =  {
    PW_MIN_LENGTH,
    PW_MAX_LENGTH,
    PW_REQUIRED_REGEXES,
    SALT_ROUNDS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_REQUIRED_REGEXES
}