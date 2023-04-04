import endpoints from "./endpoints";

const token = '13|aUEWVFEBmwEThyR7nKWUsbsE12NBd74SDFYcn94l';

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
}

class ApiService {


    register = async (
        name?: string,
        email?: string,
        password?: string,
        gender?: 'male' | 'female',
        state?: string,
        country?: string,
    ) => {
        try {
            let res = await fetch(endpoints.register + 
            `?name=${name}&email=${email}&password=${password}&gender=${gender}&state=${state}&country=${country}`
            , {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            })

            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getFeed = async () => {
        try {
            let res = await fetch(endpoints.feeds + `?page=4`, {
                method: 'GET',
                headers,
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    feedItemLike = async (id: number) => {
        try {
            let res = await fetch(endpoints.setLike, {
                method: 'POST',
                headers,
                body: JSON.stringify({id})
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    feedItemSkip = async (id: number) => {
        try {
            let res = await fetch(endpoints.setSkip, {
                method: 'POST',
                headers,
                body: JSON.stringify({id})
            }) 
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }
}


export default ApiService;