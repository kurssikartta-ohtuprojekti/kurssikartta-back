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


module.exports = { 
    getCourseMatrixPath,
     getCourseJsonPath
}