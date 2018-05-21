const supertest = require('supertest')
const {app, server} = require('../src/index.js')
const api = supertest(app)
const jsonfile = require('jsonfile')
const TKT10001 = require('./data/data.js')

test('courses are returned as json', async () => {
    await api
        .get('/courses')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('with course id correct course is returned', async () => {
    console.log(TKT10001)
       response = await api
        .get('/courses/TKT10001')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual(TKT10001.TKT10001)
})

afterAll(() => {
    server.close()
 })