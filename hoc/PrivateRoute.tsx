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

      const subid = Router?.router?.query?.subid
      const af_id = Router?.router?.query?.af_id
      const app_name = Router?.router?.query?.app_name

      if(subid && !af_id && app_name) {
        Router.push(`/start?subid=${subid}&af_id=${af_id}&app_name=${app_name}`)
        console.log('NO af_id')
      } else if (subid && af_id && app_name) {  
        Router.push(`/start?subid=${subid}&app_name=${app_name}&af_id=${af_id}`)
        console.log('WITH af_id')
      } else {
        if(pathname !== '/login') {
          Router.push('/start')
        }
      }
      console.log('subid', subid)
      console.log('af_id', af_id)
      console.log('app_name', app_name)
      
    }
    if(auth === 'SUCCESS') {
      if(pathname === '/start' || pathname === '/' || pathname === '/signup') {
        if(width <= 768) Router.push('/feed')
        if(width > 768) Router.push('/search')
      }
    }
  }, [auth, pathname])

  if(auth === 'SUCCESS' && !(pathname === '/start' || pathname === '/' || pathname === '/signup')) return <>{children}</>
  if(auth === 'ERROR' && (pathname === '/start' || pathname === '/' || pathname === '/signup' || pathname === '/login')) return <>{children}</>
  return null
}

export default PrivateRoute;