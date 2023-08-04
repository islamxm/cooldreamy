import Echo from "laravel-echo";
import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { Cookies } from "typescript-cookie";
import { IUser } from "@/models/IUser";
import ru from "@/locales/ru";
import en from "@/locales/en";

import { ILocale } from "@/models/ILocale";
import LOCAL_STORAGE from "@/helpers/localStorage";


export interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null,
    userData: IUser | null,
    isMenuOpen: boolean,
    currentProfileId: number | null,
    currentProfileUuid: string | null

    newMessage: any,
    newMail: any,
    locale: ILocale,

    actionsPricing: any[],


    limit: {
        open?: boolean,
        data?: {
            head?: string,
            text?: string,
            action?: {
                link?: string,
                label?: string
            }
        } | null
    },

    unreadChatCount: number,
    soonModal: boolean
    
}


export const globalState: IGlobalState = {
    userId: process?.browser && LOCAL_STORAGE?.getItem('cooldate-web-user-id') ? LOCAL_STORAGE.getItem('cooldate-web-user-id') : null,
    token: process?.browser && LOCAL_STORAGE?.getItem('cooldate-web-token') ? LOCAL_STORAGE.getItem('cooldate-web-token') : null,
    socketChannel: null,
    userData: null,
    isMenuOpen: false,
    newMessage: null,
    newMail: null,
    currentProfileId: null,
    currentProfileUuid: null,
    locale: en,
    actionsPricing:[],
    limit: {
        open: false,
    },
    unreadChatCount: 0,
    soonModal: false
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'UPDATE_SOCKET':
            return {
                ...state,
                socketChannel: action.socket
            }
        case 'UPDATE_USER_ID':
            return {
                ...state,
                userId: action.id
            }
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.data
            }
        case 'UPDATE_MENU':
            return {
                ...state,
                isMenuOpen: action.value
            }

        case 'UPDATE_NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.data
            }
        case 'UPDATE_NEW_MAIL':
            return {
                ...state,
                newMail: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_ID':
            return {
                ...state,
                currentProfileId: action.data
            }
        case 'UPDATE_CURRENT_PROFILE_UIID':
            return {
                ...state,
                currentProfileUuid: action.data
            }
        case 'UPDATE_LOCALE': {
            return {
                ...state,
                locale: action.data
                
            }
        }
        case 'UPDATE_PRICING':
            return {
                ...state,
                actionsPricing: action.data
            }
        case 'UPDATE_LIMIT':
            return {
                ...state,
                limit: action.data
            }
        case 'UPDATE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: action.data
            }
        case 'DECREASE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: state.unreadChatCount > 0 ? state.unreadChatCount - 1 : 0
            }
        case 'INCREASE_UNREAD_CHAT_COUNT':
            return {
                ...state,
                unreadChatCount: state.unreadChatCount + 1
            }
        case 'UPDATE_SOON_MODAL':
            return {
                ...state,
                soonModal: action.data
            }
        default:
            return state;
    }
}

export default reducer;