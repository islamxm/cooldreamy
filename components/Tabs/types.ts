export type tabsPropsType = {
    onChange: (...args: any[]) => any,
    list: tabItemType[],
    activeItem?: number | string
}


export type tabItemType = {
    id: number | string,
    badge?: number,
    label: string,
}