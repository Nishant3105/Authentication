import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/AuthContext';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const emailReference=useRef()
  const passwordReference=useRef()

  const history=useHistory()

  const AuthCtx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const authHandler =async (e)=>{
    e.preventDefault()
    setIsLoading((prevState) => !prevState);
    try{
      const enteredEmail=emailReference.current.value
      const enteredPassword=passwordReference.current.value
      const userCreds={
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }
      
      let reqURL=isLogin ?  'signInWithPassword' : 'signUp' 
      
      const response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${reqURL}?key=AIzaSyDk6BaMAPvSu4Boffm_G3IV3dU7lcV03HA`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCreds)
      })
      
      if(!response.ok){
        setIsLoading((prevState) => !prevState);
        const data=await response.json()
        throw new Error(data.error.message)
        // throw new Error('Aunthentication failed')
      }
      if(response.ok){
        setIsLoading((prevState) => !prevState);
        const data=await response.json()
        AuthCtx.login(data.idToken,data.expiresIn)
        history.replace('/')
      }

    }catch(error){
      console.log(error)
      // console.log(error.message)
      alert(error)
    }
    // finally{
    //   emailReference.current.value=""
    //   passwordReference.current.value=""
    // }
  }
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailReference} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordReference}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLogin ? (isLoading ? <p className={classes.p}>Sending Request...</p> : 
          <button onClick={authHandler}>Login</button>) : 
          <button onClick={authHandler} >Sign Up</button>
          }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
