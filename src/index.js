const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonfile = require('jsonfile')
const fileLocation = 'resources/kaikkikurssit.json'


app.use(cors())
app.use(bodyParser.json())

let courses
jsonfile.readFile(fileLocation, function (err, obj) {
  courses = obj
})


app.get('/', (req, res) => {
  res.send('<h1>Kurssikartta!</h1> <p> For all courses: /courses </br> For a single course /courses/:id </p>')
})

app.get('/courses', (req, res) => {
  res.json(courses)
})

app.get('/courses/:id', (request, response) => {
  const id = request.params.id
  const course = courses.find(course => course.code === id)

  if (course) {
    response.json(course)
  } else {
    response.status(404).end()
  }
})

/*
const generateId = () => {
  const maxId = courses.length > 0 ? courses.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}
*/
app.post('/courses', (request, response) => {
  const body = request.body
  console.log('request', body)

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const course = {
    code: body.code,
    name: body.name,
    level: body.level,
    compulsory: body.compulsory,
    prereqs: body.prereqs,
    studytrack: body['study track'],
    ects: body.ects,
    url: body.url
  }
  console.log('course:' , course)
  courses = courses.concat(course)
  console.log('courses',)
  response.json(course)
})

/*
app.delete('/courses/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(course => course.id !== id)

  response.status(204).end()
})
*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})