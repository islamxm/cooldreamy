export type tabsPropsType = {
    onChange?: () => void,
    list: tabItemType[],
    activeItem?: number
}


type tabItemType = {
    id: number,
    badge?: number,
    label: string,
}