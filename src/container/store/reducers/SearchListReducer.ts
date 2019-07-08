import { SearchListAction } from '../types'

const SearchListReducer = (state: any = [], action: SearchListAction) => {
    const { type } = action
    switch(type) {
        case 'searchList': {
            return action && action.data || []
        }
        default:
            return state
    }
}

export { SearchListReducer }