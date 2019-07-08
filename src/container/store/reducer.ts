import { combineReducers } from 'redux'
import * as Reducers from './reducers'

const SlackChatStore = combineReducers(Reducers)

export default SlackChatStore
export { SlackChatStore }
export type AppState = ReturnType<typeof SlackChatStore>