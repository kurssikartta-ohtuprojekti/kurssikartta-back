const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jsonfile = require('jsonfile')
const fileLocation = 'resources/kaikkikurssit.json'
const axios = require('axios');
const courseInfo = require('./weboodi/courseInfo')
const courseUpdate = require('./utils/courseUpdate')

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('<h1>Kurssikartta!</h1> <p> For all courses: /courses </br> For a single course /courses/:id </br> For database update /update </p>')
})

app.get('/courses', (req, res) => {
  jsonfile.readFile(fileLocation, (err, obj) => {
    if (err) {
      console.log('error:', err)
      return
    }

    res.json(obj)
  })
})

app.get('/courses/:id', (req, res) => {
  jsonfile.readFile(fileLocation, (err, obj) => {
    if (err) {
      console.log('error:', err)
      return
    }

    const id = req.params.id
    const course = obj.find(item => item.code === id)
    if (course) {
      res.json(course)
    } else {
      res.status(404).end()
    }

  })

})
app.get('/courses/info/:id', (req, res) => {
  const info = courseInfo.getCourseInfo(req.params.id)

  info.then((result) => {
    console.log('info', info)
    res.json(result)
  }).catch(() => {
    res.status(404).end()
  })

})



/*
const generateId = () => {
  const maxId = courses.length > 0 ? courses.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}
*/
/*
app.get('/courses/:id/info', (req, res) => {
  const id = req.params.id
  const url = 'https://weboodi.helsinki.fi/hy/api/public/opetushaku/hae?nimiTaiTunniste='.concat(id)
  console.log('url', url)
  axios.get(url).then(response => {
    console.log(response.data)
    if (response.data.length == 0) {

      res.status(404).json({ error: 'ei löytynyt' })
    }

    const array = response.data
    const opintokohteet = new Array(array.length)
    for (i = 0; i < opintokohteet.length; i++) {
      console.log("array", array[i])
      opintokohteet[i] = {
        opintokohteenTunniste: array[i].opintokohde.opintokohteenTunniste,
        opintokohteenNimi: array[i].opintokohde.opintokohteenNimi,
        opetustapahtumat: array[i].opetustapahtumat.map((item) => {
          const obj = {
            nimi: item.opetustapahtumanNimi,
            alkamisaika: item.alkuPvm,
            loppumisaika: item.loppuPvm,
            tyyppi: item.opetustapahtumanTyyppiSelite,
            ilmoittautuminenKaynnissa: (item.tila === "ilmoittautuminen_kaynnissa")
          }

          return obj
        }
        )
      }
    }

    // console.log('axios:', response.data )
    res.json(opintokohteet)
  }
  ).catch(error => {
    console.log(error)
  })

})
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
  console.log('course:', course)
  courses = courses.concat(course)
  console.log('courses', )
  response.json(course)
})

/*
app.delete('/courses/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(course => course.id !== id)

  response.status(204).end()
})
*/

app.get('/update', courseUpdate);


const server = require('http').createServer(app);

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = {
  app, server
}