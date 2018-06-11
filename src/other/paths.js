const productionMapPath = 'resources/map.json'
const developmentMapPath = 'resources/map.json'
const testMapPath = 'tests/data/dummyMap.json'
const productionCourseJsonPath = 'resources/kaikkikurssit.json'
const developmentCourseJsonPath = 'resources/kaikkikurssit.json'
const testCourseJsonPath = 'resources/kaikkikurssitDummy.json'


const getCourseMatrixPath = () => {
    return (process.env.NODE_ENV === 'production') ? productionMapPath : (process.env.NODE_ENV === 'development' ? developmentMapPath : testMapPath)
}


const getCourseJsonPath = () => {
    return (process.env.NODE_ENV === 'production') ? productionCourseJsonPath : (process.env.NODE_ENV === 'development' ? developmentCourseJsonPath : testCourseJsonPath)
}

const MAP_DEFAULT_LOC = 'resources/map.json'
const MAP_BACKUP_LOC = 'resources/map-original.json'

const MAP_TEST_BACKUP_LOC = 'tests/data/dummyMap-original.json'
const MAP_TEST_LOC = 'tests/data/dummyMap.json'

module.exports = { 
    getCourseMatrixPath,
     getCourseJsonPath,
     MAP_DEFAULT_LOC,
     MAP_BACKUP_LOC,
     MAP_TEST_BACKUP_LOC,
     MAP_TEST_LOC
}