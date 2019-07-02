import express = require("express")
const bodyParser = require('body-parser')
const app: express.Application = express();
import { ChatRoute } from './routes'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/chat/', ChatRoute)

app.listen(3000, () => {
    console.log('app started')
});