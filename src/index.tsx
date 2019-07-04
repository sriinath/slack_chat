import * as React from "react"
import * as ReactDOM from "react-dom"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './container/store/reducer'

const store = createStore(reducer)

import { UserChatListContainer } from './container'
import { ChatList } from './layout'

ReactDOM.render(
    <Provider store={store}>
        <UserChatListContainer>
            <ChatList />
        </UserChatListContainer>
    </Provider>,
    document.getElementById("root")
)