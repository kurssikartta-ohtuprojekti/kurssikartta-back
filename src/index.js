const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
require('dotenv').config()
const matrixRouter = require('./routers/matrixRouter')
const courseUpdate = require('./utils/courseUpdate')
const loginRouter = require('./routers/loginRouter')
const courseRouter = require('./routers/courseRouter')
const registerRouter = require('./routers/registerRouter')
const personalCoursesRouter = require('./routers/personalCoursesRouter')

app.use(cors())
app.use(bodyParser.json())
app.use(courseRouter)
app.use(loginRouter)
app.use(matrixRouter)
app.use(registerRouter)
app.use(personalCoursesRouter)


app.get('/', (req, res) => {
  res.send('<h1>Kurssikartta!</h1> <p> For all courses: /courses </br> For a single course /courses/:id </br> For database update /update </p>')
})


app.get('/update', courseUpdate);


const server = require('http').createServer(app);

var PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('error', (e) => {

  if (e.code === 'EADDRINUSE' && process.env === 'test') {
    
    setTimeout(()=> {
      PORT += 1
      server.listen(PORT)
    }, 200)
   

  } else {
    console.log('error: ', e.code)
  }

})

module.exports = {
  app, server
}