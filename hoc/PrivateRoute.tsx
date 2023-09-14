import { FC, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { deauthorize } from "@/helpers/authApi";
import { useAppDispatch } from "@/hooks/useTypesRedux";
import { updateToken, updateUserId, updateSocket, updateUserData } from "@/store/actions";

const PrivateRoute:FC<{children?: ReactNode}> = ({
  children
}) => {
  const dispatch = useAppDispatch()
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
    }
  }, [auth])

  if(auth === 'SUCCESS') return <>{children}</>

  return null
}

export default PrivateRoute;