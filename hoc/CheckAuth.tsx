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
    const {token} = useAppSelector(s => s)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(router) {
            if(!token) {
                process?.browser && Cookies.remove('')
                process?.browser && Cookies.remove('')

                dispatch(updateToken(null))
                dispatch(updateUserId(null))
                dispatch(updateSocket(null))


                if(router?.pathname !== '/') {
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
        
    }, [token, router, dispatch])


    return auth ? (
        children
    ) : (
        router?.pathname === '/' ? (
            children    
        ) : (
            <h1 style={{color: 'red', fontSize: 40, lineHeight: '60px'}}>Not auth</h1>
        )
        
    )

}

export default PrivateRoute;