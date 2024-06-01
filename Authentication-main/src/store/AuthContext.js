import React from 'react'

const AuthContext= React.createContext({
    isLoggedIn: false,
    logInOutState: ()=>{},
    token: '',
    setTokenVal: ()=>{}
})

export default AuthContext