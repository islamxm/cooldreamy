import endpoints from "../endpoints";
import { IToken } from "@/models/IToken";
import { headers } from "../apiService";
import checkAuth from "../checkAuth";


const authService = {
    register: () => async (
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
    },
    login: () => async (body: {
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
}

export default authService;