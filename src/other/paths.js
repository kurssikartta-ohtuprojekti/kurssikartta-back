

const prodMapPath = 'resources/map.json'
const devMapPath = 'resources/map.json'
const testMapPath = 'tests/data/dummyMap.json'

const chooseCourseMatrixPath = () => {
    return (process.env.NODE_ENV === 'production') ? prodMapPath : (process.env.NODE_ENV === 'development' ? devMapPath : testMapPath)
}


const prodPath = 'resources/kaikkikurssit.json'
const devPath = 'resources/kaikkikurssit.json'
const testPath = 'resources/kaikkikurssitDummy.json'

const chooseCourseJsonPath = () => {
    return (process.env.NODE_ENV === 'production') ? prodPath : (process.env.NODE_ENV === 'development' ? devPath : testPath)
}


module.exports = { 
    chooseCourseMatrixPath,
     chooseCourseJsonPath
}