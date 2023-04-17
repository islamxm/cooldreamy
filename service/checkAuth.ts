const checkAuth = (res: any) => {
    if(res?.status === 401) {

    } else {
        return res?.json()
    } 

}

export default checkAuth;