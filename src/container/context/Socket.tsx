import * as React from 'react'
import * as io from 'socket.io-client'

class Socket {
    private socket: SocketIOClient.Socket
    constructor(url?: string, userName?: string) {
        if(url && userName) {
            this.socket = io(url, {query : `userName=${userName}`})
        }
    }
    get getSocket() {
        return this.socket
    }
}

const SocketContext: React.Context<SocketIOClient.Socket> = React.createContext(new Socket().getSocket)
const { Provider, Consumer } = SocketContext

const SocketProvider = (props: React.PropsWithChildren<any>) => {
    const { children, url, userName } = props
    const socket = new Socket(url, userName)
    return (
        <Provider value={socket && socket.getSocket} >
            {children}
        </Provider>
    )
}

export { SocketProvider, Consumer as SocketConsumer, SocketContext }