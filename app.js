const express = require('express')
const morgan = require('morgan')

const app = express()

app.set('view engine', 'ejs')

app.listen(3000)

// middleware & static files
app.use(express.static('public'))

app.use(morgan('dev'))

app.get('/', (req, res) => {
    //res.send('<p>Home Page</p>')
    //res.render('./views/index', { root: __dirname })
    const blogs = [
        {title: 'Blog A', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Blog B', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Blog C', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ]
    res.render('index', { title: 'Home', blogs })
})


app.get('/about', (req, res) => {
    //res.send('<p>About Page</p>')
    //res.sendFile('./views/about.ejs', { root: __dirname })
    res.render('about', { title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'})
})

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.ejs', { root: __dirname })
    res.status(404).render('404', { title: '404'})
})