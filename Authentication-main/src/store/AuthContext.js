import React, { useState } from 'react'

const AuthContext= React.createContext({
    token: '',
    isLoggedIn: false,
    login: (tokenValue)=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('')
  
    const useLoggedInVal = !!token
  
    const logInHandler = (tokenValue) => {
      setToken(tokenValue)
    }
  
    const logOutHandler = () => {
      setToken(null)
    }
  
    const contextValues = {
      token: token,
      isLoggedIn: useLoggedInVal,
      login: logInHandler,
      logout: logOutHandler
    }
  
    return (
      <AuthContext.Provider value={contextValues}>
        {props.children}
      </AuthContext.Provider>
    )
  }

export default AuthContext