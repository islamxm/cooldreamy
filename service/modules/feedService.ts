import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";

const feedService = {
    getFeed: () => async ({
        page
    }: {
        page?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.feeds + `?page=${page}`, {
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
    feedItemLike: () => async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setLike, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    feedItemSkip: () => async ({
        id
    }: {
        id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.setSkip, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({id})
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
}

export default feedService;