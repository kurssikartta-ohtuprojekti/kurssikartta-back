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
        await api
        .get('/courses/TKT10001')
        .expect(200)
        .expect('Content-Type', /application\/json/)
   
})

afterAll(() => {
    server.close()
 })