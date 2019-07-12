import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { SearchListAction } from '../../store/actions'
import { SearchType } from '../../../types'

const defaultSearchListContext: SearchType[] = []
const SearchListContext = React.createContext(defaultSearchListContext)
const { Consumer, Provider } = SearchListContext

class SearchListContainer extends React.Component<any> {
    componentDidUpdate(prevProps :any) {
        const { searchUsers } = DataAPI
        const { searchTerm } = this.props
        const prevSearchTerm = prevProps && prevProps.searchTerm || ''
        if(searchTerm && searchTerm !== prevSearchTerm) {
            if(searchTerm.trim().length) {
                Utils.fetchResponse(`${searchUsers}?searchTerm=${searchTerm}`)
                .then(resp => {
                    if(resp) {
                        const { status } = resp
                        if(status.toLowerCase() === 'success') {
                            const { data } = resp
                            if(data && data.status && data.status.toLowerCase() === 'success') {
                                let UserInfo =  data.data || []
                                this.props.dispatch(SearchListAction(UserInfo))
                            }
                        }
                    }
                })
                .catch(err => console.log(err))    
            }
            else {
                this.props.dispatch(SearchListAction([]))
            }
        }
    }
    render() {
        const {
            data,
            children
        } = this.props
        return <Provider value={data}>
            {children}
        </Provider>
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.SearchListReducer
})

export default connect(mapStateToProps)(SearchListContainer)
export { Consumer as SearchListConsumer }