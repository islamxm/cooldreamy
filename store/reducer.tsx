import Echo from "laravel-echo";
import { PusherPrivateChannel } from "laravel-echo/dist/channel";
import { Cookies } from "typescript-cookie";

interface IGlobalState {
    userId: string | { [property: string]: string; } | null | undefined,
    token: string | { [property: string]: string; } | null | undefined,
    socketChannel: PusherPrivateChannel | null
}


const globalState: IGlobalState = {
    userId: process?.browser && Cookies.get('cooldate-web-user-id') ? Cookies.get('cooldate-web-user-id') : null,
    token: process?.browser && Cookies.get('cooldate-web-token') ? Cookies.get('cooldate-web-token') : null,
    socketChannel: null
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...globalState,
                token: action.token
            }
        case 'UPDATE_SOCKET':
            return {
                ...globalState,
                socketChannel: action.socket
            }
        case 'UPDATE_USER_ID':
            return {
                ...globalState,
                userId: action.id
            }
        default:
            return state;
    }
}

export default reducer;