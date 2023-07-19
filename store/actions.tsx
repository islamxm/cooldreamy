import { ILocale } from "@/models/ILocale";
import { IUser } from "@/models/IUser";
import { PusherPrivateChannel, Channel } from "laravel-echo/dist/channel";


export const updateToken = (token: string | { [property: string]: string; } | null | undefined) => ({type: 'UPDATE_TOKEN', token: token})
export const updateSocket = (socket: PusherPrivateChannel | Channel |  null) => ({type: 'UPDATE_SOCKET', socket: socket})
export const updateUserId = (id: string | { [property: string]: string; } | number | null | undefined) => ({type: 'UPDATE_USER_ID', id: id})
export const updateUserData = (data: IUser | null) => ({type: 'UPDATE_USER_DATA', data})
export const updateMenu = () => ({type: 'UPDATE_MENU'})
export const updateCurrentProfileId = (data:number | null) => ({type: 'UPDATE_CURRENT_PROFILE_ID', data}) 
export const updateCurrentProfileUiid = (data:string | null) => ({type: 'UPDATE_CURRENT_PROFILE_UIID', data}) 


export const updateNewMessage = (data: any) => ({type: 'UPDATE_NEW_MESSAGE', data})
export const updateNewMail = (data: any) => ({type: 'UPDATE_NEW_MAIL', data})

export const updateLocale = (data: ILocale) => ({type: 'UPDATE_LOCALE', data})

export const updatePricing = (data: any[]) => ({type: 'UPDATE_PRICING', data})


export const updateLimit = (data: {
    open?: boolean, 
    data?: {
        head?: string, 
        text?: string, 
        action?: {
            link?: string,
            label?: string
        }
    }
}) => ({type: "UPDATE_LIMIT", data})


export const updateUnreadChatCount = (data: number) => ({type: 'UPDATE_UNREAD_CHAT_COUNT', data})