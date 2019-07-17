import * as React from 'react'
import { AppContextProps } from './typings'
import { SocketContext } from '../../container'

const defaultAppContext: AppContextProps = {
    currentPage: '',
    userName: '',
    recipientUserName: '',
    chatId: '',
    newChats: []
}
const AppPanelContext = React.createContext(defaultAppContext)
const { Provider, Consumer } = AppPanelContext

class AppPanel extends React.Component<AppContextProps, AppContextProps> {
    static contextType = SocketContext
    constructor(props: AppContextProps) {
        super(props)
        this.state = {
            currentPage: this.props.currentPage,
            userName: this.props.userName,
            recipientUserName: this.props.recipientUserName,
            chatId: this.props.chatId,
            newChats: []
        }
    }
    componentDidMount() {
        this.context.on('newMessage', (data: any, chatId: string, recipientUserName: string) => {
            console.log(chatId)
            if(chatId !== this.state.chatId) {
                let newChatArr = [...this.state.newChats]
                if(newChatArr.indexOf(chatId) === -1) {
                    newChatArr.push(chatId)
                }
                this.setState({ newChats: newChatArr })
            }
        })
    }
    render() {
        const { children } = this.props
        const mainPanelValue: AppContextProps = {
            currentPage: this.state.currentPage,
            userName: this.state.userName,
            recipientUserName: this.state.recipientUserName,
            chatId: this.state.chatId,
            newChats: this.state.newChats,
            updateCurrentPage: (currentPage: string) => this.setState({ currentPage }),
            updateRecipientUserName: (recipientUserName: string) => this.setState({ recipientUserName }),
            updateChatId: (chatId: string) => this.setState({ chatId })
        }
        return <Provider value={mainPanelValue}>
            {children}
        </Provider>
    }
}

export {
    AppPanel as AppProvider,
    Consumer as AppConsumer
}