const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

let courses = [
  {
    id: 1,
    name: 'Johdatus tietojenkäsittelytieteeseen',
    courseId: 'TKT10001',
    compulsory: true,
    level: 'Peruskurssi',
    url: 'https://courses.helsinki.fi/fi/TKT10001'
  },
  {
    id: 2,
    name: 'Ohjelmoinnin perusteet',
    courseId: 'TKT10002',
    compulsory: true,
    level: 'Peruskurssi',
    url: 'https://courses.helsinki.fi/fi/TKT10002'
  },
  {
    id: 3,
    name: 'Ohjelmoinnin jatkokurssi',
    courseId: 'TKT10003',
    compulsory: true,
    level: 'Peruskurssi',
    url: 'https://courses.helsinki.fi/fi/TKT10003'
  },
]


app.get('/', (req, res) => {
  res.send('<h1>Kurssikartta!</h1>')
})

app.get('/courses', (req, res) => {
  res.json(courses)
})

app.get('/courses/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = courses.length > 0 ? courses.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}

app.post('/courses', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const course = {
    name: body.name,
    courseId: body.courseId,
    compulsory: body.compulsory,
    level: body.level,
    url: body.url,
    id: generateId()
  }

  courses = courses.concat(course)

  response.json(course)
})

app.delete('/courses/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(course => course.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})