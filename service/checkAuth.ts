import { Cookies } from "typescript-cookie";
import LOCAL_STORAGE from "@/helpers/localStorage";
const checkAuth = (res: any) => {
    if(res?.status === 401) {
        LOCAL_STORAGE?.removeItem('cooldate-web-user-id')
        LOCAL_STORAGE?.removeItem('cooldate-web-token')
        process?.browser && window.location.replace('/start')
    } else {
        return res?.json()
    } 

}

export default checkAuth;