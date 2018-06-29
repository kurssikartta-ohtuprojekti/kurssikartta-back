// file errors
const FILE_ERROR = 'file not found or could not be opened'
const FILE_INCORRECT_FORMAT = 'data in file has incorrect format'
const ID_MISSING_OR_INCORRECT = 'given id is not an integer'
const DATA_INCORRECT_FORMAT = 'data in incorrect format'
// authentication related errors
const NO_TOKEN = 'token missing'
const INVALID_TOKEN = 'token is invalid'
const ACCOUNT_NOT_FOUND = 'account not found'
const INVALID_USERNAME_OR_PASSWORD = 'invalid username or password'
const NO_USERNAME_OR_PASSWORD = 'username or password missing'
const UNAUTHROZED_ACTION = 'unauthorized action'
// account creation

const PW_MIN_CRITERIA_NOT_MET = 'password does not meet the minimum criteria'
const USERNAME_MIN_CRITERIA_NOT_MET = 'username does not meet the minimum criteria'
const USERNAME_TAKEN = 'username is already taken'
// other

const NOT_FOUND = 'resource not found'

// ok messages
const VALID_TOKEN = 'token is valid'
const UPDATE_DONE = 'resource updated'
// const DELETED = 'resource deleted'

// recaptcha
const NOT_HUMAN = 'failed recaptcha'

module.exports = {
    UNAUTHROZED_ACTION,
    FILE_ERROR,
    NOT_FOUND,
    FILE_INCORRECT_FORMAT,
    NO_TOKEN,
    INVALID_TOKEN,
    ACCOUNT_NOT_FOUND,
    VALID_TOKEN,
    UPDATE_DONE,
    INVALID_USERNAME_OR_PASSWORD,
    NO_USERNAME_OR_PASSWORD,
    DATA_INCORRECT_FORMAT,
    ID_MISSING_OR_INCORRECT,
    PW_MIN_CRITERIA_NOT_MET,
    USERNAME_MIN_CRITERIA_NOT_MET,
    USERNAME_TAKEN,
    NOT_HUMAN,
}