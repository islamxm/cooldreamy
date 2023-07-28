export type searchInfoType = {
    total?: number,
    filter_type?: 'nearby' | 'online' | 'new' | 'all'
    setfilter_type?: (...args: any[]) => any,

    setIsFilterChanged?: (...args: any[]) => any
} 