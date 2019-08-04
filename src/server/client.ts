import * as express from 'express'
import * as path from 'path'

const clientApp = (app: express.Application) => {
    app.use('/', express.static(path.resolve('./dist/build')))
    app.use('/fonts', express.static(path.resolve('./dist/fonts')))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('./dist/build/index.html'))
    })
}

export { clientApp as default }