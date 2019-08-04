import * as fs from 'fs'
import * as express from 'express'
import * as path from 'path'

import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { ClientApp as App } from '../App'

const clientApp = (app: express.Application) => {
    app.use('/bundle.js', express.static(path.resolve('./dist/build/bundle.js')))
    app.use('/fonts', express.static(path.resolve('./src/fonts')))
    app.get('/', (req, res) => {
        const StyleSheet = new ServerStyleSheet()
        const ClientApp = renderToString(
            <StyleSheetManager sheet={StyleSheet.instance}>{StyleSheet.collectStyles(App)}</StyleSheetManager>
        )
        const styleTags = StyleSheet.getStyleTags()
        fs.readFile(path.resolve('./dist/build/index.html'), 'utf8', (err, data) => {
            if (err) {
              console.error('Something went wrong:', err);
              return res.status(500).send('Oops, better luck next time!');
            }
        
            return res.send(
                data.replace(
                    '<div id="root"></div>',
                    `<div id="root">
                        ${ClientApp}
                        ${styleTags}
                    </div>`
                )
            );
        });
    })
}

export { clientApp as default }