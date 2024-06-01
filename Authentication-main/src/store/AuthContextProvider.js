import React,{useState} from 'react'
import AuthContext from './AuthContext'

const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [token,setToken]=useState('')

    const logInOutStateHandler=()=>{
      setIsLoggedIn((prevState)=>!prevState)
    }

    const setTokenValHandler=(tokenValue)=>{
      setToken(tokenValue)
    }

    const contextValues={
        isLoggedIn: isLoggedIn,
        logInOutState: logInOutStateHandler,
        token: token,
        setTokenVal: setTokenValHandler
    }

  return (
    <AuthContext.Provider value={contextValues}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider