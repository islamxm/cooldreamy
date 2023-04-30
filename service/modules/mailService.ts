import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";


const mailService = {
    createMail: () => async ({user_id}:{user_id: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.createMail + `?user_id=${user_id}`, {
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
    getMailList: () => async ({per_page, page}:{page?: number, per_page?: number}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMailList + `?per_page=${per_page}&page=${page}`, {
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
    },
    sendMail_text: () => async (body: {
        letter_id: number,
        text: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_text, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    sendMail_sticker: () => async (body: {
        letter_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_sticker, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    sendMail_gift: () => async (body: {
        letter_id: string,
        gifts: string //string: [1,2,3]
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMail_gift, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    },
    getMail: () => async ({id, page, per_page}:{id: number, page?: number, per_page?: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.getMail + `?letter_id=${id}&page=${page}&per_page=${per_page}`, {
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
    },
    readMail: () => async (body: {
        letter_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMail, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
}


export default mailService;