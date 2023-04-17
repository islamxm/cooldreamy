export type selectOptionType = {
    value: string,
    label: string,
    id?: number
}

export type selectDefType = {
    placeholder: string,
    list: selectOptionType[],
    value?: number,
    width?: number | string,
    label?: string,
    onChange?: (...args: any[]) => any
}