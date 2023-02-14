type selectOptionType = {
    value: string,
    label: string,
    id?: string
}

export type selectDefType = {
    placeholder: string,
    list: selectOptionType[],
    value: string
}