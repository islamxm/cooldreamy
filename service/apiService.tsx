import endpoints from "./endpoints";


export const tks = {
    boy_token: '14|fKGAoFZ8v2EYVAZE57Xm4Jpfq1QXT3gAL13TmkbW',
    girl_token: '15|b3FBYZgkB1keI0eRN8WCcYrfmwmlvdOR1vmM1sUS'
}




const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${tks.boy_token}`
}

class ApiService {


    register = async (
        name?: string,
        email?: string,
        password?: string,
        gender?: 'male' | 'female',
        state?: string,
        country?: string,
    ) => {
        try {
            let res = await fetch(endpoints.register + 
            `?name=${name}&email=${email}&password=${password}&gender=${gender}&state=${state}&country=${country}`
            , {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    
                }
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    search = async (
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
        
    ) => {
        try {
            let res = await fetch(endpoints.search + 
                `?page=${page}&state=${state ? state : ''}&country=${country ? country : ''}&age_range_start=${age_range_start}&age_range_end=${age_range_end}&prompt_target_id=${prompt_target_id ? prompt_target_id : ''}&prompt_finance_state_id=${prompt_finance_state_id ? prompt_finance_state_id : ''}&new=${isNew}&near=${isNear}&online=${isOnline}`, {
                method: 'GET',
                headers
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getPromptTargets = async () => {
        try {
            let res = await fetch(endpoints.getPromptTargets, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tks.boy_token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getPromptFinanceState = async () => {
        try {
            let res = await fetch(endpoints.getPromptFinanceState, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tks.boy_token}`
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getFeed = async () => {
        try {
            let res = await fetch(endpoints.feeds + `?page=4`, {
                method: 'GET',
                headers,
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    feedItemLike = async (id: number) => {
        try {
            let res = await fetch(endpoints.setLike, {
                method: 'POST',
                headers,
                body: JSON.stringify({id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    feedItemSkip = async (id: number) => {
        try {
            let res = await fetch(endpoints.setSkip, {
                method: 'POST',
                headers,
                body: JSON.stringify({id})
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    //открытие чата
    createChat = async (id: number) => {
        try {
            let res = await fetch(endpoints.createChat + `?user_id=${id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getChatList = async (per_page?: number) => {
        try {
            let res = await fetch(endpoints.getChatList + `?per_page=${per_page}`, {
                method: 'GET',
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    sendMessage_text = async (body: {
        chat_id: number,
        text: string
    }, token: string) => {
        try {
            let res = await fetch(endpoints.sendMessage_text, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMessage_sticker = async (body: {
        chat_id: number,
        sticker_id: number
    }) => {
        try {
            let res = await fetch(endpoints.sendMessage_sticker, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMessage_gift = async (body: {
        chat_id: string,
        gifts: string //string: [1,2,3]
    }) => {
        try {
            let res = await fetch(endpoints.sendMessage_gift, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getChat = async (id: number, per_page?: number) => {
        try {
            let res = await fetch(endpoints.getChat + `?chat_id=${id}&per_page=${per_page}`, {
                method: 'GET',
                headers
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getStickers = async () => {
        try {
            let res = await fetch(endpoints.getStickers, {
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getGifts = async () => {
        try {
            let res = await fetch(endpoints.getGifts, {
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    readMessage = async (body: {
        chat_message_id: number
    }, token: string) => {
        try {
            let res = await fetch(endpoints.readMessage, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }



    //mail
    createMail = async (id: number) => {
        try {
            let res = await fetch(endpoints.createMail + `?user_id=${id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getMailList = async (per_page?: number) => {
        try {
            let res = await fetch(endpoints.getMailList + `?per_page=${per_page}`, {
                method: 'GET',
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    sendMail_text = async (body: {
        letter_id: number,
        text: string
    }) => {
        try {
            let res = await fetch(endpoints.sendMail_text, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tks.girl_token}`
                },
                body: JSON.stringify(body)
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMail_sricker = async (body: {
        letter_id: number,
        sticker_id: number
    }) => {
        try {
            let res = await fetch(endpoints.sendMail_sticker, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tks.girl_token}`
                },
                body: JSON.stringify(body)
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    sendMail_gift = async (body: {
        letter_id: string,
        gifts: string //string: [1,2,3]
    }) => {
        try {
            let res = await fetch(endpoints.sendMail_gift, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tks.girl_token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getMail = async (id: number, per_page?: number) => {
        try {
            let res = await fetch(endpoints.getMail + `?letter_id=${id}&per_page=${per_page}`, {
                method: 'GET',
                headers
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    readMail = async (body: {
        letter_message_id: number
    }) => {
        try {
            let res = await fetch(endpoints.readMail, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${tks.girl_token}`
                },
                body: JSON.stringify(body)
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
    

    sendWink = async (user_id: number) => {
        try {
            let res = await fetch(endpoints.sendWink, {
                method: 'POST',
                headers: {
                    ...headers
                },
                body: JSON.stringify({user_id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

}


export default ApiService;