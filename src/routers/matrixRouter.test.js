const supertest = require('supertest')
const { app, server } = require('./../index.js')
const api = supertest(app)
const paths = require('./../other/paths')
const jsonfile = require('jsonfile')

const resetTestMap = () => {
    const obj = jsonfile.readFileSync(paths.MAP_TEST_BACKUP_PATH)
    jsonfile.writeFileSync(paths.MAP_TEST_PATH, obj)
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

const dataEqualsOriginal = async () => {

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
}
/* HTTP DEL matrix/:id */
test('after a HTTP DELETE is sent to /matrix/:id with no token, an error message and status 403 are returned and no data is changed', async () => {
    resetTestMap()
    var res = await api
        .delete('/matrix/2')
        .expect(403)

    expect(res.body).toEqual({
        "error": "token missing"
    })
    dataEqualsOriginal()

})

test('after a HTTP DELETE is sent to /matrix/:id with invalid token, an error message and status 403 are returned and no data is changed', async () => {
    resetTestMap()
    var res = await api
        .delete('/matrix/2')
        .set({ authorization: 'not-a-token' })
        .expect(403)

    expect(res.body).toEqual({
        "error": "token is invalid"
    })
    dataEqualsOriginal()
})

test('after a HTTP DELETE is sent to /matrix/:id with a valid token but with invalid id, an error and status 400 are returned and no data is change', async () => {
    resetTestMap()
    const token = await loginAndRetrieveToken()

    const res = await api
        .delete('/matrix/a')
        .set({ authorization: token })
        .expect(400)

    expect(res.body).toEqual({
        "error": "given id is not an integer"
    })
    dataEqualsOriginal()
})

test('after a HTTP DELETE is sent to /matrix/:id with a valid token but with a non-existing id, an error and status 4004 are returned and no data is change', async () => {
    resetTestMap()
    const token = await loginAndRetrieveToken()

    const res = await api
        .delete('/matrix/1')
        .set({ authorization: token })
        .expect(404)

    expect(res.body).toEqual({
        "error": "resource not found"
    })
    dataEqualsOriginal()
})

test('after a HTTP DELETE is sent to /matrix/:id with a valid token and a valid id, the specified entry is deleted but the map is not altered in any other ways', async () => {
    resetTestMap()
    const token = await loginAndRetrieveToken()

    var res = await api
        .delete('/matrix/2')
        .set({ authorization: token })
        .expect(204)



    res = await api
        .get('/matrix')
        .expect(200)

    expect(res.body).toEqual(
        [
            { "id": 0, "name": "Dummy", "matrice": [[".", "."], [".", "."]]}
        ]

    )
})
/*
test('after a HTTP POST is sent to /matrix with a valid token, status 200 is returned', async () => {
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
*/
/* HTTP GET /matrix */

test('after a HTTP GET is sent to /matrix, a list of possible matrices and status 200 are returned', async () => {
    resetTestMap()


    dataEqualsOriginal()
})

/* HTTP GET /matrix/:id */

test('after a HTTP GET is sent to /matrix/:id, a map matrix with same id and status 200 are returned ', async () => {
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

test('after a HTTP GET is sent to /matrix/:Not-an-integer-id, an explanatory error message and status 400 are returned', async () => {
    resetTestMap()

    const res = await api
        .get('/matrix/abcsd')
        .expect(400)

    expect(res.body).toEqual({
        "error": "given id is not an integer"
    })

})

test('after a HTTP GET is sent to /matrix/:id with a non-existing id, an explanatory error and status 404 are returned', async () => {
    resetTestMap()

    const res = await api
        .get('/matrix/99')
        .expect(404)

    expect(res.body).toEqual({
        "error": "resource not found"
    })
})

/* HTTP POST matrix/:id */
test('after a HTTP POST is sent to /matrix/:id with an invalid valid token, an error message and status 403 are returned and data is not changed', async () => {
    resetTestMap()
    let token = await loginAndRetrieveToken()
    token = token.slice(1)

    let res = await api
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
        .expect(403)

    expect(res.body).toEqual({ "error": "token is invalid" })

    dataEqualsOriginal()


})

test('after a HTTP POST is sent to /matrix/:id with NO token, an error message and status 403 are returned and data is not changed', async () => {
    resetTestMap()

    let res = await api
        .post('/matrix/2')
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
        .expect(403)

    expect(res.body).toEqual({ "error": "token missing" })

    dataEqualsOriginal()


})

test('after a HTTP POST is sent to /matrix/:id with a valid token but with malformatted data, an error message and status 403 are returned and data is not changed', async () => {
    resetTestMap()
    const token = await loginAndRetrieveToken()

    let res = await api
        .post('/matrix/2')
        .set({ authorization: token })
        .send({
            "id": 2,
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
        .expect(400)

    expect(res.body).toEqual({ "error": "data in incorrect format" })

    dataEqualsOriginal()


})

test('after a HTTP POST is sent to /matrix/:id with a valid token, the correct map matrix entry is replaced', async () => {
    resetTestMap()

    const token = await loginAndRetrieveToken()


    let res = await api
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

    expect(res.body).toEqual({ "msg": "resource updated" })

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




afterAll(() => {
    server.close()
})
