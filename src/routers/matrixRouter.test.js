const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)
const paths = require('./../other/paths')
const jsonfile = require('jsonfile')

const resetTestMap = () => {
    const obj = jsonfile.readFileSync(paths.MAP_TEST_BACKUP_LOC)
    jsonfile.writeFileSync(paths.MAP_TEST_LOC, obj)
}
const loginAndRetrieveToken = async () => {
    var res = await api
        .post('/login', )
        .send({
            'username': 'testAdmin',
            'password': 'hevonen'
        })
    return JSON.parse(res.text).token
}
test('after HTTP POST is sent to /matrix with a valid token, status 200 is returned', async () => {
    const token = await loginAndRetrieveToken()


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


    expect(JSON.parse(res.text).msg).toBe('ok, updated')


})

test('after a HTTP POST is sent to /matrix with no token, status 403 is returned', async () => {

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
        }).expect(403)


    expect(JSON.parse(res.text).error).toBe('token missing')

})

test('after a HTTP GET is sent to /matrix/:id, a map matrix with same id and status are returned ', async () => {
    resetTestMap()

    const res = await api
        .get('/matrix/2')
        .expect(200)

    expect(res.body).toEqual({
        "id": 2,
        "name": "Dummy2",
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
})

test('after a HTTP GET is sent to /matrix/:Not-an-integer-id, an explanatory error message and status are returned', async () => {
    resetTestMap()

    const res = await api
        .get('/matrix/abcsd')
        .expect(400)

    expect(res.body).toEqual({
        "error": "data in incorrect format"
    })

})

test('after a HTTP POST is sent to /matrix/:id, the correct map matrix entry is replaced', async () => {
    resetTestMap()

    const token = await loginAndRetrieveToken()


    var res = await api
        .post('/matrix/2')
        .set({ authorization: token })
        .send({
            "id": 2,
            "name": "DummyREPLACED",
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

    expect(res.body).toEqual({ "msg": "ok, updated" })

    res = await api
        .get('/matrix')
        .expect(200)

    expect(res.body).toEqual([
        {
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
        },
        {
            "id": 2,
            "name": "DummyREPLACED",
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
        }
    ])

})

test('after a HTTP GET is sent to /matrix, a list of possible matrices and status 200 are returned', async () => {
    resetTestMap()

    const res = await api
        .get('/matrix')
        .expect(200)

    expect(res.body).toEqual([
        {
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
        },
        {
            "id": 2,
            "name": "Dummy2",
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
        }
    ])
})


afterAll(() => {
    server.close()
})
