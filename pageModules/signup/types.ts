export type targetTypes = '1' | '2' | '3' | '4' | '';
export type interestTypes = '1' | '2' | '3' | '4' | '5' | '6' | '';




export interface IPromptSelect {
    list?: {id: number, text: string}[],
    // selectedList?: {id: number, text: string}[],
    selectedList?: number | null
    setSelectedList: (...args: any[]) => void
}
