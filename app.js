const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

//connect to MongoDB
const uri = 'mongodb+srv://administrator:Password@cluster0.qkt9t.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri)
    .then((res) => app.listen(3000))
    .catch((err) => console.error(err))

app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.use('/blogs', blogRoutes)

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.ejs', { root: __dirname })
    res.status(404).render('404', { title: '404'})
})