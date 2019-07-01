import express = require("express")
const app: express.Application = express();

import { ChatRoute } from './routes'

app.use('/chat/', ChatRoute)

app.listen(3000, () => {
    console.log('app started')
});