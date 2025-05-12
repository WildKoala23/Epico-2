var express = require('express')
var app = express()


const appRoute = require('./routes/appRoute')
const passRoute = require('./routes/passRoute')

app.set('port', process.env.PORT || 8000)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/passwords', passRoute)

app.use('/app', appRoute)

app.listen(app.get('port'), () => {
    console.log('Listening on port 8000')
})