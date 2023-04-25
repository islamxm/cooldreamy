export type selectOptionType = {
    value: string,
    label: string,
    id?: number
}

export type selectDefType = {
    placeholder: string,
    list: selectOptionType[],
    value?: number | string,
    width?: number | string,
    label?: string,
    onChange?: (...args: any[]) => any,
    onClear?: (...args: any[]) => any
}