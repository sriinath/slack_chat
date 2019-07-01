import express = require("express")
const app = express();

app.get('/get', (req, res) => {
    res.send('Not Today!!!')
})

app.listen(3000, () => {
    console.log('app started')
});