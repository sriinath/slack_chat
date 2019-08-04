import * as React from "react"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './container/store/reducer'

const store = createStore(reducer, {})

import { App } from './layout'

import { Global } from './common'
const ClientApp = <Provider store={store}>
    <Global />
    <App />
</Provider>

export { ClientApp }