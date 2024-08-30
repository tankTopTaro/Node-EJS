const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

//connect to MongoDB
const uri = 'mongodb+srv://administrator:Password@cluster0.qkt9t.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri)
    .then((res) => app.listen(3000))
    .catch((err) => console.error(err))

app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.error(err)
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'})
})

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.ejs', { root: __dirname })
    res.status(404).render('404', { title: '404'})
})