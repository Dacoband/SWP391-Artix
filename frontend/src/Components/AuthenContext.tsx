
import React,{createContext,useState} from 'react'
import { User } from '../Interfaces/UserInterface';


const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth,SetAuth] = useState<User>()
    return (<AuthContext.Provider value={{auth,SetAuth}} >{
        children}
        </AuthContext.Provider>)
}

export default AuthContext;
 