import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (tokenValue) => { },
    logout: () => { }
})

export const AuthContextProvider = (props) => {
    const innitialTokenValue=localStorage.getItem('token')
    
    const [token, setToken] = useState(innitialTokenValue)

    const useLoggedInVal = !!token

    const logInHandler = (tokenValue, expiry) => {
        localStorage.setItem('token', tokenValue)
        setToken(tokenValue)
        setTimeout(()=>{
            alert('Please Login Again!!')
            logOutHandler()
        },300000)
    }
    
    const logOutHandler = () => {
        localStorage.removeItem('token')
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