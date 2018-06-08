const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)

test('test nothing', async () => {
    console.log('lalala')

})


afterAll(() => {
    server.close()
})
