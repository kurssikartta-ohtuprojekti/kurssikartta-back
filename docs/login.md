
### POST /login - Send account username and password in the message body. Login credentials are validated and a token is returned if successful.
POST message body format:
```
{
    "username":  String,
    "password":  String
}
```

Possible responses:

200 OK

401 username or password missing

401 invalid username or password


Response format:

{
    "token": String,
    "username": String
}

Example:

POST /login

```
{
    "username":  "myUsernameHere",
    "password":  "myPasswordHere"
}
```

Response:
200 OK
```
{
    "token": "eyJhb4ciOiJIUI1rNiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIi4w234giaWhdsF0IjoxNTI4MjAzODE1fQ.3WhiprK9z2b5J-QeySwg5E4m-rtXkbsu4rVf7LdXCOug",
    "username": "myUsernameHere"
}
```
OR
401 Unauthorized
```
{
    "error": "invalid username or password"
}
```