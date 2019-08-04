import express = require("express")

const bodyParser = require('body-parser')
const app: express.Application = express();
import {
    ChatRoute,
    UserRoute,
    GroupRoute
} from './routes'
import ClientApp from './client'
const socketInit = require('./socket')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header("Access-Control-Max-Age", "600")
    next();
});

app.use('/chat/', ChatRoute)
app.use('/user/', UserRoute)
app.use('/group/', GroupRoute)

const server = app.listen({ port: process.env.PORT || 3000 }, () => {
    console.log('app started')
});
ClientApp(app)
socketInit(server)