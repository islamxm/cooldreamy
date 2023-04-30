import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";


const commonService = {
    sendWink: () => async ({user_id}:{user_id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendWink, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({user_id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getStickers: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getStickers, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getGifts: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getGifts, {
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getPromptTargets: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptTargets, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getPromptFinanceState: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPromptFinanceState, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getCountries: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getCountries, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getStates: () => async (country_id: number, token: IToken) => {
        try {
            let res = await fetch(endpoints.getStates + `?country_id=${country_id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getAllPrompts: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getAllPrompts, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
}

export default commonService;