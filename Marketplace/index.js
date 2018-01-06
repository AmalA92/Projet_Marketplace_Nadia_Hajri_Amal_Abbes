var express = require("express"),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    config = require('./app/config'),
    routes = require('./app'),
    promise = require('bluebird'),
    compression = require('compression'),
    helmet = require('helmet'),
    cors = require('cors'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    rfs = require('rotating-file-stream')

var app = express(),
    db = config.db,
    port = config.port

app.use(cors())

// morgan config
//jornalisation

var logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})
app.use(morgan('combined', {
    stream: accessLogStream
}))


app.use(compression())
app.use(helmet())


mongoose.connect(db, {
    useMongoClient: true
})
mongoose.Promise = promise

app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(express.static(__dirname + '/public'));

app.use('/api', routes)

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})


app.listen(port)
exports = module.exports = app
