import * as React from 'react'
import { useState } from 'react'
import { TypeAheadWrapper } from './styled'
import { SearchListContainer, SearchListConsumer } from '../../container'
import { InputWrapper, ListItem } from '../../component'
import { SearchUserProps } from '../../types'

const SearchUser = (props: SearchUserProps) => {
    const [ searchTerm, setSearchTerm ] = useState('')
    const {
        ItemBlock,
        listCommonProps,
        inputPlaceholder,
        inputLabel
    } = props
    let searchTextCount = 0

    return <SearchListContainer searchTerm={searchTerm}>
        <InputWrapper
            placeholder={inputPlaceholder}
            label={inputLabel}
            id='groupSearch'
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                let searchText = e.currentTarget.value
                searchTextCount = searchText.length
                if(searchTextCount)
                    document.getElementById('typeAhead').style.display = 'block'
                else
                    document.getElementById('typeAhead').style.display = 'none'
                setSearchTerm(searchText)
            }}
        />
        <SearchListConsumer>
        {context => {
            return <TypeAheadWrapper id='typeAhead'>
                <ListItem
                    list={context && Array.isArray(context) && context || []}
                    Item={ItemBlock}
                    commonProps={listCommonProps}
                />
            </TypeAheadWrapper>
        }}
        </SearchListConsumer>
    </SearchListContainer>
}

export { SearchUser }