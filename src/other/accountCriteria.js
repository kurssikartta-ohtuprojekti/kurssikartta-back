/* password */
const PW_MIN_LENGTH = 10
const PW_MAX_LENGTH = 20
const PW_REQUIRED_REGEXES = [/\d/] // huom lisää validoinnit 

/* username */

const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 10
const USERNAME_REQUIRED_REGEXES = [] // huom lisää validoinnit 



/* cryptography */

const SALT_ROUNDS = 10;

module.exports = {
    PW_MIN_LENGTH,
    PW_MAX_LENGTH,
    PW_REQUIRED_REGEXES,
    SALT_ROUNDS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_REQUIRED_REGEXES
}