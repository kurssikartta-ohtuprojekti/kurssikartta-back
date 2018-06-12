### GET '/courses' - returns a list containing all courses

Possbile response codes:

200 OK

500 file not found or could not be opened



Response format:
```
[
    {
        "code": Course code: String,
        "name": Course name: String,
        "level": Level: string,
        "compulsory": compulsory: boolean,
        "prereqs": prerequirements: List of strings. May be empty,
        "studytrack": studytrack(s): List of strings. May be empty,
        "ects": ECTS: String,
        "url": URL: String
    },
    .
    .
    .
]
 ```
Example:
 
GET /courses

Response:

200 OK
 ```
[
    {
        "code": "TKT10001",
        "name": "Johdatus tietojenkäsittelytieteeseen",
        "level": "Perusopinnot",
        "compulsory": true,
        "prereqs": [],
        "studytrack": [],
        "ects": "5",
        "url": "https://courses.helsinki.fi/fi/TKT10001"
    },
    {
        "code": "CSM14106",
        "name": "Software Factory Experience",
        "level": "Syventävät",
        "compulsory": false,
        "prereqs": [
            "TKT20006",
            "TKT20007"
        ],
        "studytrack": [
            "ss"
        ],
        "ects": "5",
        "url": "https://courses.helsinki.fi/fi/CSM14106"
    }
]
```
### GET '/courses/:id' - returns a single course entry. The id is the code of the course, ie. TKT10001.

Possible response codes: 

200 OK

404 resource not found

500 file not found or could not be opened

Response format:
```
{
    "code": Course code: String,
    "name": Course name: String,
    "level": Level: string,
    "compulsory": compulsory: boolean,
    "prereqs": prerequirements: List of strings. May be empty,
    "studytrack": studytrack(s): List of strings. May be empty,
    "ects": ECTS: String,
    "url": URL: String
}
```

Example:

GET /courses/TKT10001

Response:
200 OK
```
{
    "code": "TKT10001",
    "name": "Johdatus tietojenkäsittelytieteeseen",
    "level": "Perusopinnot",
    "compulsory": true,
    "prereqs": [],
    "studytrack": [],
    "ects": "5",
    "url": "https://courses.helsinki.fi/fi/TKT10001"
}
```

### GET '/courses/info/:id' - Course data for the given id is fetched from WebOodi and returned as json. The id is the course code.

Possible response codes:

200 OK

404 resource not found


Response format:
```
[
    {
        "key": 0,
        "opintokohteenTunniste": "Exact course code: String",
        "opetustapahtumat": [
            {
                "key": int,
                "nimi": String
                "alkamisaika": int (UNIX time stamp),
                "loppumisaika": int (UNIX time stamp),
                "tyyppi": String",
                "ilmoittautuminenKaynnissa": boolean
            }
        ]
    },
    .
    .
    .
]
```
Example:

GET /courses/info/MAT11002

Response:
```
[
    {
        "key": 0,
        "opintokohteenTunniste": "AYMAT11002",
        "opetustapahtumat": [
            {
                "key": 0,
                "nimi": "Avoin yo: Lineaarialgebra ja matriisilaskenta I, kesä 2018",
                "alkamisaika": 1526245200000,
                "loppumisaika": 1529010000000,
                "tyyppi": "Luentokurssi",
                "ilmoittautuminenKaynnissa": false
            }
        ]
    },
    {
        "key": 1,
        "opintokohteenTunniste": "MAT11002",
        "opetustapahtumat": [
            {
                "key": 0,
                "nimi": "Lineaarialgebra ja matriisilaskenta I - Tenttiakvaario",
                "alkamisaika": 1506805200000,
                "loppumisaika": 4511714400000,
                "tyyppi": "Examinarium (tenttiakvaario)",
                "ilmoittautuminenKaynnissa": true
            }
        ]
    }
]
```
