const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)


test('after HTTP POST is sent to /matrix with a valid token, status 200 is returned', async () => {
    var res = await api
        .post('/login', )
        .send({
            'username': 'testAdmin',
            'password': 'hevonen'
        })
        .expect(200)

    const token = JSON.parse(res.text).token


    res = await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "id": 0,
            "name": "Dummy",
            "matrice": [
                [
                    ".",
                    "."
                ],
                [
                    ".",
                    "."
                ]
            ]
        })


    expect(JSON.parse(res.text).msg).toBe('Ok, updated')




})

test('after HTTP POST is sent to /matrix with no token, status 401 is returned', async () => {

    const res = await api
        .post('/matrix')
        .send({
            "id": 0,
            "name": "Dummy",
            "matrice": [
                [
                    ".",
                    "."
                ],
                [
                    ".",
                    "."
                ]
            ]
        })


    expect(JSON.parse(res.text).error).toBe('token missing')

})


afterAll(() => {
    server.close()
})
