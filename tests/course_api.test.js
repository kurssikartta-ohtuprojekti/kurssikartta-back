const supertest = require('supertest')
const { app, server } = require('../src/index.js')
const api = supertest(app)
const jsonfile = require('jsonfile')
const { TKT10001 } = require('./data/data.js')

test('courses are returned as json', async () => {
    const response = await api
        .get('/courses')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log('Data: ', response.data)    
})

test('with course id correct course is returned', async () => {
    const response = await api
        .get('/courses/TKT10001')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual(TKT10001)
})

test('with incorrect id status 404 error message is returned', async () => {
    response = await api
        .get('/courses/TKT1001')
        .expect(404)
})

afterAll(() => {
    server.close()
})

