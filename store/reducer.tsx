import { Cookies } from "typescript-cookie";



const globalState = {
    userId: process?.browser && Cookies.get('cooldate-web-user-id') ? Cookies.get('cooldate-web-user-id') : null,
    token: process?.browser && Cookies.get('cooldate-web-token') ? Cookies.get('cooldate-web-token') : null,
    socket: null
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
                socket: action.socket
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