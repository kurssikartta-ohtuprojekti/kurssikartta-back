/* password */
const PW_MIN_LENGTH = process.env.PW_MIN_LENGTH
const PW_MAX_LENGTH = process.env.PW_MAX_LENGTH
const PW_REQUIRED_REGEXES = process.env.PW_VALIDATIONS// huom tarkista validoinnit 
/*
/\d/ must contain a number
/^[a-z0-9]+$/i must be alphanumeric, incasesensitive
*/

/* username */
const USERNAME_MIN_LENGTH = process.env.USERNAME_MIN_LENGTH
const USERNAME_MAX_LENGTH = process.env.USERNAME_MAX_LENGTH
const USERNAME_REQUIRED_REGEXES = process.env.USERNAME_VALIDATION // huom tarkista validoinnit 
/*
/\d/ must contain a number
/^[a-z0-9]+$/i must be alphanumeric, incasesensitive
*/


/* cryptography */

const SALT_ROUNDS = process.env.SALT_ROUNDS

module.exports = {
    PW_MIN_LENGTH,
    PW_MAX_LENGTH,
    PW_REQUIRED_REGEXES,
    SALT_ROUNDS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_REQUIRED_REGEXES
}