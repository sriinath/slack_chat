import { SearchListType } from '../types'

const SearchListAction = (action: SearchListType) => {
    return {
        type: 'searchList',
        data: action
    }
}

export { SearchListAction }