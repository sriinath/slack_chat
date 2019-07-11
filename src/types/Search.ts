interface SearchType {
    userName: string
}
interface SearchData {
    data: SearchType[]
}
interface SearchUserProps {
    ItemBlock: any
    listCommonProps: any
    inputPlaceholder: string
    inputLabel: string
}
export {
    SearchData,
    SearchType,
    SearchUserProps
}