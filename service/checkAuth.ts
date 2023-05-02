import { Cookies } from "typescript-cookie";

const checkAuth = (res: any) => {
    if(res?.status === 401) {
        Cookies.remove('cooldate-web-user-id')
        Cookies.remove('cooldate-web-token')
        process?.browser && window.location.replace('/start')
    } else {
        return res?.json()
    } 

}

export default checkAuth;