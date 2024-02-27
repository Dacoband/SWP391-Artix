import {useContext} from 'react'
import AuthContext from '../Components/AuthenContext.tsx'

export default function LoginContext({userinfo}) {
  //AuthContext{auth,SetAuth}
  const {auth,SetAuth} = useContext(AuthContext) 
  SetAuth(userinfo)
  return(
    console.log(auth)
  )
}
