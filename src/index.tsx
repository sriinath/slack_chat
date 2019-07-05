import * as React from "react"
import * as ReactDOM from "react-dom"

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './container/store/reducer'

const store = createStore(reducer)

import { UserChatListContainer, MessageListContainer } from './container'
import { ChatList, MessageList } from './layout'

ReactDOM.render(
    <Provider store={store}>
        <MessageListContainer>
            <MessageList />
        </MessageListContainer>
    </Provider>,
    document.getElementById("root")
)