export type searchInfoType = {
    total?: number,
    isOnline?: 1 | 0,
    isNear?: 1 | 0,
    isNew?: 1 | 0,
    setIsOnline?: (...args: any[]) => any
    setIsNear?: (...args: any[]) => any
    setIsNew?: (...args: any[]) => any
} 