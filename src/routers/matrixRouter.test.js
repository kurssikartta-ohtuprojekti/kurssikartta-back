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
    await dataEqualsOriginal()

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
    await dataEqualsOriginal()
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
    await dataEqualsOriginal()
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
    await dataEqualsOriginal()
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
            { "id": 0, "name": "Dummy", "matrice": [[".", "."], [".", "."]] }
        ]

    )
})

/* HTTP GET /matrix */

test('after a HTTP GET is sent to /matrix, a list of possible matrices and status 200 are returned', async () => {
    resetTestMap()


    await dataEqualsOriginal()
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

    await dataEqualsOriginal()


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

    await dataEqualsOriginal()


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

    await dataEqualsOriginal()


})
test('after a HTTP POST is sent to /matrix/:id with valid token, but /:id and and id in the object do not match an error is returned and data is not changed', async () => {
    resetTestMap()

    const token = await loginAndRetrieveToken()


    const res = await api
        .post('/matrix/0')
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
        .expect(400)


    expect(res.body).toEqual({ "error": "data in incorrect format" })
    await dataEqualsOriginal()


})

test('after a HTTP POST is sent to /matrix/:id with valid token and valid data, but the entry did not previously exist, an error is returned and data is not changed', async () => {
    resetTestMap()

    const token = await loginAndRetrieveToken()


    const res = await api
        .post('/matrix/1')
        .set({ authorization: token })
        .send({
            "id": 1,
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
        .expect(404)

    expect(res.body).toEqual({ "error": "resource not found" })

    await dataEqualsOriginal()


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

/* HTTP POST /matrix */

test('after a HTTP POST is sent to /matrix with no token, error 403 is returned and no data is changed', async () => {
    resetTestMap()

    const res = await api
        .post('/matrix')
        .send({
            "name": "newENTRY",
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
    await dataEqualsOriginal
})

test('after a HTTP POST is sent to /matrix with invalid token, error 403 is returned and no data is changed', async () => {
    resetTestMap()

    const token = '234odhgiodfhgieg'
    const res = await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "name": "newENTRY",
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
    await dataEqualsOriginal
})

test('after a HTTP POST is sent to /matrix with a valid token, but an id is given, error 400 returned and no data is changed', async () => {
    resetTestMap()



    const token = await loginAndRetrieveToken()
    const res = await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "id": "2",
            "name": "newENTRY",
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
    await dataEqualsOriginal
})

test('after a HTTP POST is sent to /matrix with a valid token and valid data, a new entry is created and returned', async () => {


    resetTestMap()

    const token = await loginAndRetrieveToken()
    var res = await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "name": "newENTRY1",
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
        .expect(201)

    expect(res.body).toEqual({
        "id": 1,
        "name": "newENTRY1",
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

    res = await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "name": "newENTRY2",
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
        .expect(201)

    expect(res.body).toEqual({
        "id": 3,
        "name": "newENTRY2",
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

    await api
        .post('/matrix')
        .set({ authorization: token })
        .send({
            "name": "newENTRY3",
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
        .expect(201)
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
            "id": 1,
            "name": "newENTRY1",
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
        },
        {
            "id": 3,
            "name": "newENTRY2",
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
            "id": 4,
            "name": "newENTRY3",
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
