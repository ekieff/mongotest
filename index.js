const express = require('express')
const app = express()

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use('/rsvp', require('./controllers/rsvp'))

app.get('/', (req, res) =>{
    res.send('welcome to the homeroute')
})

app.listen(4000, () =>{
    console.log('You\'re on port 3600')
})