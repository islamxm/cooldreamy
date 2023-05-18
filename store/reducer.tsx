import Echo from "laravel-echo";
import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { Cookies } from "typescript-cookie";
import { IUser } from "@/models/IUser";
import ru from "@/locales/ru";
import { ILocale } from "@/models/ILocale";


export interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null,
    userData: IUser | null,
    isMenuOpen: boolean,
    currentProfileId: number | null

    newMessage: any,
    newMail: any,
    locale: ILocale
}


export const globalState: IGlobalState = {
    userId: process?.browser && Cookies.get('cooldate-web-user-id') ? Cookies.get('cooldate-web-user-id') : null,
    token: process?.browser && Cookies.get('cooldate-web-token') ? Cookies.get('cooldate-web-token') : null,
    socketChannel: null,
    userData: null,
    isMenuOpen: false,
    newMessage: null,
    newMail: null,
    currentProfileId: null,
    locale: ru
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
                isMenuOpen: !state?.isMenuOpen
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
        case 'UPDATE_LOCALE': {
            return {
                ...state,
                locale: action.data
                
            }
        }
        default:
            return state;
    }
}

export default reducer;