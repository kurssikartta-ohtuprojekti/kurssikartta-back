/* course map matrix json paths */
const productionMapPath = 'resources/map.json'
const developmentMapPath = 'resources/map.json'
const testMapPath = 'resources/test/dummyMap.json'
/* course json paths*/
const productionCourseJsonPath = 'resources/allCourses.json'
const developmentCourseJsonPath = 'resources/allCourses.json'
const testCourseJsonPath = 'resources/test/dummyAllCourses.json'
/* account paths */

const productionAccountsPath = 'resources/accounts'
const developmentAccountsPath = 'resources/accounts'
const testAccountsPath = 'resources/test/dummyAccounts'

const getCourseMatrixJsonPath = () => {
    return (process.env.NODE_ENV === 'production') ? productionMapPath : (process.env.NODE_ENV === 'development' ? developmentMapPath : testMapPath)
}

const getCourseJsonPath = () => {
    return (process.env.NODE_ENV === 'production') ? productionCourseJsonPath : (process.env.NODE_ENV === 'development' ? developmentCourseJsonPath : testCourseJsonPath)
}

const getAccountJsPath = () => {
    return (process.env.NODE_ENV === 'production') ? productionAccountsPath : (process.env.NODE_ENV === 'development' ? developmentAccountsPath : testAccountsPath)
}

const MAP_DEFAULT_PATH = 'resources/map.json'
const MAP_BACKUP_PATH = 'resources/map-original.json'

const MAP_TEST_BACKUP_PATH = 'resources/test/dummyMap-original.json'
const MAP_TEST_PATH = 'resources/test/dummyMap.json'

const COURSE_TEST_PATH = 'resources/test/dummyCourseData'
module.exports = {
    getCourseJsonPath,
    getAccountJsPath,
    getCourseMatrixJsonPath,
    MAP_DEFAULT_PATH,
    MAP_BACKUP_PATH,
    MAP_TEST_BACKUP_PATH,
    MAP_TEST_PATH,
    COURSE_TEST_PATH
}