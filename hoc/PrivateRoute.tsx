import { FC, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { deauthorize } from "@/helpers/authApi";
import { useAppDispatch } from "@/hooks/useTypesRedux";
import { updateToken, updateUserId, updateSocket, updateUserData } from "@/store/actions";
import Router, { useRouter } from "next/router";
import { useWindowSize } from "usehooks-ts";
const PrivateRoute:FC<{children?: ReactNode}> = ({
  children
}) => {
  const dispatch = useAppDispatch()
  const {width} = useWindowSize()
  const {pathname} = useRouter()
  const {token} = useAppSelector(s => s)
  const [auth, setAuth] = useState<'SUCCESS' | 'ND' | 'ERROR'>('ND')

  useEffect(() => {
    console.log(token)
    if(token === null) {
      setAuth('ERROR')
    }
    if(token) {
      setAuth('SUCCESS')
    }
  }, [token])


  useEffect(() => {
    if(auth === 'ERROR') {
      dispatch(updateToken(null))
      dispatch(updateUserId(null))
      dispatch(updateSocket(null))
      dispatch(updateUserData(null))
      deauthorize()
      Router.push('/start')
    }
    if(auth === 'SUCCESS') {
      if(pathname === '/start' || pathname === '/' || pathname === '/signup') {
        if(width <= 768) Router.push('/sympathy')
        if(width > 768) Router.push('/search')
      }
    }
  }, [auth, pathname])

  if(auth === 'SUCCESS' && !(pathname === '/start' || pathname === '/' || pathname === '/signup')) return <>{children}</>
  if(auth === 'ERROR' && (pathname === '/start' || pathname === '/' || pathname === '/signup')) return <>{children}</>
  return null
}

export default PrivateRoute;