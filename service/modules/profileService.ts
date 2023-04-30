import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";

const profileService = {
    getMyProfile: () => async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getMyProfile, {
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
    },
    getProfile: () => async ({user_id}: {user_id:number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getProfile + `?user_id=${user_id}`, {
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
    },
    addProfileImage: () => async (data: FormData, token: IToken) => {
        try {
            let res = await fetch(endpoints.addProfileImage, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    },
    updateMyProfile: () => async (body: any, token: IToken) => {
        try {
            let res = await fetch(endpoints.updateMyProfile, {
                method:'PUT',
                body: JSON.stringify(body),
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

export default profileService;