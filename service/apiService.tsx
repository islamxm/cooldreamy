import endpoints from "./endpoints";

const token = '12|ynL9Qf5suoACdYl32OZ2dVAtIexUpwLVUSn0lGS9';

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
}

class ApiService {

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