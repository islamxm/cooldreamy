import Echo from "laravel-echo";
import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { Cookies } from "typescript-cookie";



export interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null,
    test: boolean
}


export const globalState: IGlobalState = {
    userId: process?.browser && Cookies.get('cooldate-web-user-id') ? Cookies.get('cooldate-web-user-id') : null,
    token: process?.browser && Cookies.get('cooldate-web-token') ? Cookies.get('cooldate-web-token') : null,
    socketChannel: null,
    test: false
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
        case 'TEST':
            return {
                ...state,
                test: !globalState.test
            }
        default:
            return state;
    }
}

export default reducer;