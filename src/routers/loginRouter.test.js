const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)


test('login with correct username and password is succesful and token and correct code are returned', async () => {
    const res = await api
        .post('/login', )
        .send({
            'username': 'testAdmin',
            'password': 'hevonen'
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(JSON.parse(res.text).username).toBe('testAdmin')


})

test('login with correct username and incorrect password is not succesful', async () => {
    const res = await api
        .post('/login', )
        .send({
            'username': 'testAdmin',
            'password': 'eiHevonen'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(JSON.parse(res.text).error).toBe('invalid username or password')


})

test('login with incorrect username and correct password is not succesful', async () => {
    const res = await api
        .post('/login', )
        .send({
            'username': 'eiTestAdmin',
            'password': 'hevonen'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(JSON.parse(res.text).error).toBe('invalid username or password')


})

test('if username is not defined error 401 is returned', async () => {
    const res = await api
        .post('/login', )
        .send({
            'password': 'hevonen'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(JSON.parse(res.text).error).toBe('username or password missing')
})

test('if password is not defined error 401 is returned', async () => {
    const res = await api
        .post('/login', )
        .send({
            'username': 'testAdmin'
        })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(JSON.parse(res.text).error).toBe('username or password missing')
})

afterAll(() => {
    server.close()
})
