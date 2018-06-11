const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)
const jsonfile = require('jsonfile')
const { TKT10001, CSM14209 } = require('./../../tests/data/dummyCourseData.js')

test('courses are returned as json', async () => {

    const response = await api
        .get('/courses')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    //  console.log('Data: ', response.data)
})

test('with course id correct course is returned', async () => {
    let response = await api
        .get('/courses/TKT10001')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual(TKT10001)

    response = await api
        .get('/courses/CSM14209')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body).toEqual(CSM14209)

})

test('with incorrect id status 404 and resource not found error message is returned', async () => {
    const response = await api
        .get('/courses/TKT1001')
        .expect(404)
        expect(response.body).toEqual({'error': 'resource not found'})
})

afterAll(() => {
    server.close()
})

