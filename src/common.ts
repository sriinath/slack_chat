import { createGlobalStyle } from 'styled-components'
import fontawesomeTTF from './fonts/fontawesome-webfont.ttf'
import fontawesomeWOFF from './fonts/fontawesome-webfont.woff'
import fontawesomeWOFF2 from './fonts/fontawesome-webfont.woff2'
import fontawesomeEOT from './fonts/fontawesome-webfont.eot'
const fonts = [
    fontawesomeTTF,
    fontawesomeEOT,
    fontawesomeWOFF,
    fontawesomeWOFF2
]
const Global = createGlobalStyle`
    @font-face {
        font-family: 'FontAwesome';
        src: url('./fonts/fontawesome-webfont.ttf') format("truetype"),
        url('./fonts/fontawesome-webfont.woff') format("woff"),
        url('./fonts/fontawesome-webfont.woff2') format("woff2"),
        url('./fonts/fontawesome-webfont.eot') format("eot");
    }
    body {
        margin: 0px;
    }
    #root {
        color: #444;
        font-family: sans-serif;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
`
export { Global }