import * as React from 'react'
import { AppContextProps } from './typings'

const defaultAppContext: AppContextProps = {
    currentPage: '',
    userName: '',
    recipientUserName: '',
    chatId: ''
}
const AppPanelContext = React.createContext(defaultAppContext)
const { Provider, Consumer } = AppPanelContext

class AppPanel extends React.Component<AppContextProps, AppContextProps> {
    constructor(props: AppContextProps) {
        super(props)
        this.state = {
            currentPage: this.props.currentPage,
            userName: this.props.userName,
            recipientUserName: this.props.recipientUserName,
            chatId: this.props.chatId
        }
    }
    render() {
        const { children } = this.props
        const mainPanelValue: AppContextProps = {
            currentPage: this.state.currentPage,
            userName: this.state.userName,
            recipientUserName: this.state.recipientUserName,
            chatId: this.state.chatId,
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