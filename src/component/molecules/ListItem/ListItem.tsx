import * as React from 'react'
import { ListItemProps } from './typings'
import { ListWrapper } from './styled'

const ListItem = (props: ListItemProps) => {
    const {
        list,
        Item,
        commonProps
    } = props
    return <ListWrapper>
        {
            list.map((data, index) => <Item {...data} {...commonProps} key={'chatlist_' + index}/>)
        }
    </ListWrapper>
}

export { ListItem }