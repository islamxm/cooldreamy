import { selectOptionType } from "@/components/SelectDef/types"

export type searchFilterType = {
    load?: boolean,
    targetList: any[],
    financeList: any[],
    age_range_start: number,
    setage_range_start?: (...args: any[]) => any,
    age_range_end: number,
    setage_range_end?: (...args: any[]) => any,
    prompt_target_id?: number,
    setprompt_target_id?: (...args: any[]) => any,
    prompt_finance_state_id?: number,
    setprompt_finance_state_id?: (...args: any[]) => any,
    onSearch?: (...args: any[]) => any,


    countries: selectOptionType[],
    country?: string
}