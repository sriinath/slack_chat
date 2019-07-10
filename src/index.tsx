import * as React from "react"
import * as ReactDOM from "react-dom"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './container/store/reducer'
import { SocketProvider } from './container/context/Socket'

const store = createStore(reducer, {})

import { UserChatListContainer } from './container'
import { App } from './layout'

import { Global } from './common'

ReactDOM.render(
    <Provider store={store}>
        <Global />
        <UserChatListContainer>
            <SocketProvider url='localhost:3000'>
                <App />
            </SocketProvider>
        </UserChatListContainer>
    </Provider>,
    document.getElementById("root")
)