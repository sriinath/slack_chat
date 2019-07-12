import * as React from "react"
import * as ReactDOM from "react-dom"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './container/store/reducer'

const store = createStore(reducer, {})

import { App } from './layout'

import { Global } from './common'

ReactDOM.render(
    <Provider store={store}>
        <Global />
        <App />
    </Provider>,
    document.getElementById("root")
)