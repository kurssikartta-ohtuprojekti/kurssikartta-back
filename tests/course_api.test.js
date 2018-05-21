const supertest = require('supertest')
const {app} = require('../src/index.js')
const api = supertest(app)

test('courses are returned as json', async () => {
    await api
        .get('/courses')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})