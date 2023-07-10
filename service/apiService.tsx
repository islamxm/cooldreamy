import endpoints from "./endpoints";
import { IToken } from "@/models/IToken";
import checkAuth from "./checkAuth";




export const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'X-Localization': 'ru'
}

//'Authorization': `Bearer ${token}`

class ApiService {


    register = async (
        body: {
            name: string,
            email: string,
            password: string
        }
    ) => {
        try {
            let res = await fetch(endpoints.register, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    login = async (body: {
        email: string,
        password: string
    }) => {

        try {
            let res = await fetch(endpoints.login, {
                method: 'POST',
                body: JSON.stringify(body),
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    search = async (
        body: {
        page: number,
        // isNew: 1 | 0,
        // isOnline: 1 | 0,
        // isNear: 1 | 0,
        filter_type?: 'nearby' | 'new' | 'online'
        state?: string,
        country?: string,
        age_range_start?: number,
        age_range_end?: number,
        prompt_targets?: any,
        prompt_finance_states?: any,
        per_page?: number
    }, token: IToken
        
    ) => {
        try {
            let res = await fetch(endpoints.search, {
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


    getPromptTargets = async (token: IToken) => {
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
    }


    getPromptFinanceState = async (token: IToken) => {
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
    }

    getCountries = async (token: IToken) => {
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
    }

    getStates = async (country_id: number, token: IToken) => {
        try {
            let res = await fetch(endpoints.getStates + `?country_id=${country_id}`, {
                method: 'GET',
                headers,
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getFeed = async ({
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
    }

    feedItemLike = async ({
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
    }


    feedItemSkip = async ({
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

    //открытие чата
    
    createChat = async ({user_id}: {
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
    }

    getChatList = async ({page, per_page = 10, filter, search}: 
        {
            page?: number, 
            per_page?: number,
            filter?: string,
            search?: string
        }, token: IToken) => {
        try {
            let res = await fetch(endpoints.getChatList + `?page=${page}&per_page=${per_page}&filter=${filter}${search ? `&search=${search}` : ''}`, {
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

    getChatListFavorite = async ({page, per_page = 10}: {
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
    }

 

    sendMessage_text = async (body: {
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
    }

    sendMessage_sticker = async (body: {
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
    }

    sendMessage_gift = async (body: {
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
    }

    sendMessage_image = async (body: {
        chat_id: number | string,
        thumbnail_url: string,
        image_url: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.sendMessage_image, {
                method: 'POST',
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

    // chatSearch = async (token: IToken) => {
    //     try {
    //         let res = await fetch(endpoints)
    //     }
    // }

    getChat = async ({id, page, per_page = 10}: 
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
    }

    getStickers = async (token: IToken) => {
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
    }

    getGifts = async (token: IToken) => {
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
    }

    readMessage = async (body: {
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



    //mail
    createMail = async ({user_id}:{user_id: number}, token: IToken) => {
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
    }

    getMailList = async ({per_page, page}:{page?: number, per_page?: number}, token: IToken) => {
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
    }


    sendMail_text = async (body: {
        letter_id: number | string,
        text?: string,
        images?: string
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
    }

    sendMail_sticker = async (body: {
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
    }

    sendMail_gift = async (body: {
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
    }



    getMail = async ({id, page, per_page}:{id: number, page?: number, per_page?: number | string}, token: IToken) => {
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
    }


    readMail = async (body: {
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

    mailOpenPay = async (body: {letter_text_message_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.mailOpenPay, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }

    mailImagePay = async (image_in_letter_id: number | string, token: IToken) => {
        try {
            let res = await fetch(endpoints.mailImagePay + `?image_in_letter_id=${image_in_letter_id}`, {
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
    

    sendWink = async ({user_id}:{user_id: number}, token: IToken) => {
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
    }



    getMyProfile = async (token: IToken) => {
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
    }


    getProfile = async ({user_id}: {user_id:number}, token: IToken) => {
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
    }

    // updateMyProfile = async (token: IToken) => {
    //     try {
    //         let res = await fetch(endpoints.updateMyProfile, {
    //             method: 'PUT',
    //         })
    //     }
    // }


    getAllPrompts = async (token: IToken, locale?: string) => {
        try {
            let res = await fetch(endpoints.getAllPrompts, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`,
                    // 'Accept-Language': locale ? locale : 'ru',
                    'X-localization': locale ? locale : 'ru'
                }
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    addProfileImage = async (data: FormData, token: IToken) => {
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
    }


    updateMyProfile = async (body: any, token: IToken) => {
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


    //activity
    getActivityViews = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActivityViews, {
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

    getActivityLikes = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActivityLikes, {
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

    getActivityInLikes = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActivityInLikes, {
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

    getActivityMutualLikes = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActivityMutualLikes, {
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

    addUserToFav = async (body: {user_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.addUserToFav, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res
        } catch(err) {
            console.log(err)
        }
    }

    deleteUserFromFav = async (body: {user_id: number | string}, token: IToken) => {
        try {
            let res = await fetch(endpoints.deleteUserFromFav, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })
            return await res
        } catch(err) {
            console.log(err)
        }
    }

    getActionPricing = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getActionPricing, {
                method: 'POST',
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

    // TEST
    setCredits = async (token: IToken, body: {credits: number}) => {
        try {
            let res = await fetch(endpoints.setCredits, {
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

    subscribe = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.subscribe, {
                method: "POST",
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

    deleteChat = async (token: IToken, id: number) => {
        try {
            let res = await fetch(endpoints.deleteChat + id, {
                method: 'DELETE',
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

    signupEnd = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.signupEnd, {
                method: 'POST',
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

    getChatMedia = async (token: IToken, id?: number | string) => {
        try {
            let res = await fetch(endpoints.getChatMedia + id, {
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


    //pay

    pay = async (token: IToken, body: {
        list_type?: string,
        list_id?: string
    }) => {
        try {
            let res = await fetch(endpoints.pay, {
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


    getPayPlans = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.getPayPlans, {
                method: "GET",
                headers: {
                    ...headers,
                    'Authorization': `Bearer ${token}`
                },
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
}


export default ApiService;