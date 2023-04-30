import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";


const searchService = {
    search: () => async ({
        page,
        isNew,
        isNear,
        isOnline,
        state,
        country,
        age_range_start,
        age_range_end,
        prompt_target_id,
        prompt_finance_state_id
    }: {
        page: number,
        isNew: 1 | 0,
        isOnline: 1 | 0,
        isNear: 1 | 0,
        state?: string,
        country?: string,
        age_range_start?: number,
        age_range_end?: number,
        prompt_target_id?: number | string,
        prompt_finance_state_id?: number | string,
    }, token: IToken
        
    ) => {
        try {
            let res = await fetch(endpoints.search + 
                `?page=${page}&state=${state ? state : ''}&country=${country ? country : ''}&age_range_start=${age_range_start}&age_range_end=${age_range_end}&prompt_target_id=${prompt_target_id ? prompt_target_id : ''}&prompt_finance_state_id=${prompt_finance_state_id ? prompt_finance_state_id : ''}&new=${isNew}&near=${isNear}&online=${isOnline}`, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
}

export default searchService;