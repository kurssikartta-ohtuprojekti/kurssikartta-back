
### GET /matrix - Returns a list containing all current course matrice

Possbile responses

200 OK

500 file not found or could not be opened

Response format:
```
[{
    "id": int,
    "name": String",
    "matrice": [
        [
          String, String, String, String, String...
        ],
        [ 
          String, String, String, String, String...
         ]
        .
        .
        .
       ]
    
}
, {...}
, {...}
]

```

Example response:

```
[{
    "id": 0,
    "name": "Default",
    "matrice": [
        [
            ".",
            ".",
            ".",
           
         .
         .
         .
         .
            ".",
            ".",
            ".",
            ".",
            ".",
            ".",
            "."
        ]
    ]
}]
```


### GET /matrix/:id - returns a single course map matrix entry specified by :id

Possible responses

200 OK

400 data in incorrect format

500 file not found or could not be opened

500 data in file has incorrect format

404 resource not found



Response format:
200 OK
```
{
    "id": int,
    "name": String",
    "matrice": [
        [
          String, String, String, String, String...
        ],
        [ 
          String, String, String, String, String...
         ]
        .
        .
        .
       ]
    
}
```
OR 
404 NOT FOUND

```
{
   "error": "Resource not found"
}
```

### GET /reset - Resets the course map matrix to the original

Response format:
200 OK
```
{
    "msg": "Ok, updated"
}
```

### POST /matrix/:id - updates a single entry specified by the id. Send with authorization header containing jwt token.

Possible responses

200 ok, updated

403 token missing

403 token is invalid

403 account not found

400 given id is not an integer

400 data in incorrect format

500 file not found or could not be opened

500 data in file has incorrect format


Request format:

POST /matrix/id 

Headers:
authorization: token
```
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

```
id, name and matrice fields are all mandatory.


### DELETE /matrix/:id - deletes a single entry specified by the id. Send request with authorization header containing jwt token.

Possible responses

204 *no content*

403 token missing

403 token is invalid

403 account not found

400 given id is not an integer

500 file not found or could not be opened

500 data in file has incorrect format