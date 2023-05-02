import {FC, useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import Router, { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Cookies } from 'typescript-cookie';
import { updateToken, updateUserId, updateSocket } from '@/store/actions';

const PrivateRoute = ({
    children
}: {
    children: React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}) => {

    const router = useRouter()
    const [auth, setAuth] = useState(false)
    const {token, socketChannel} = useAppSelector(s => s)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(router) {
            if(!token) {
                process?.browser && Cookies.remove('cooldate-web-token')
                process?.browser && Cookies.remove('cooldate-web-user-id')

                socketChannel && socketChannel?.unsubscribe()

                dispatch(updateToken(null))
                dispatch(updateUserId(null))
                dispatch(updateSocket(null))

                

                if(router?.pathname !== '/' && router?.pathname !== '/signup') {
                    router.replace('/')
                } else {
                    return;
                }


            } else {
                setAuth(true)
                if(router?.pathname === '/') {
                    router?.push('/search')
                } else {
                    return;
                }
            }
        }
        
    }, [token, router, dispatch, socketChannel])


    return auth ? (
        children
    ) : (
        router?.pathname === '/' || router?.pathname === '/signup'  ? (
            children    
        ) : (
            null
            // можно показать лоадер
        )
        
    )

}

export default PrivateRoute;