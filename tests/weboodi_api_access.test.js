
const supertest = require('supertest')
const courseInfo = require('../src/weboodi/courseInfo')
const { weboodiApiBase } = require('../src/urls')
const { TKT10001 } = require('./data/data')

test('with an existing course code data is returned', async () => {
  //  const info = await courseInfo.getCourseInfo(TKT10001.code)
   // console.log('test info', info)
})
