import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";

const chatService = {
    createChat: () => async ({user_id}: {
        user_id?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.createChat + `?user_id=${user_id}`, {
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
    getChatList: () => async ({page, per_page = 10}: 
        {
            page?: number, 
            per_page?: number
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatList + `?page=${page}&per_page=${per_page}`, {
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
    getChatListFavorite: () => async ({page, per_page = 10}: {
        page?: number,
        per_page?: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatListFavorite  + `?page=${page}&per_page=${per_page}`, {
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
    sendMessage_text: () => async (body: {
        chat_id: number,
        text: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_text, {
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
    sendMessage_sticker: () => async (body: {
        chat_id: number,
        sticker_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_sticker, {
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
    sendMessage_gift: () => async (body: {
        chat_id: string,
        gifts: string //string: [1,2,3]
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_gift, {
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
    getChat: () => async ({id, page, per_page = 10}: 
        {
            id: number,
            page: number,
            per_page?: number
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChat + `?page=${page}&chat_id=${id}&per_page=${per_page}`, {
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
    readMessage: () => async (body: {
        chat_message_id: number
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.readMessage, {
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

export default chatService;