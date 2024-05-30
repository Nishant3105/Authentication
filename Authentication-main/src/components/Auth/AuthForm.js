import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const emailReference=useRef()
  const passwordReference=useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    // setIsLoading((prevState) => !prevState);
  };

  const handleLoading=(e)=>{
    e.preventDefault()
    setIsLoading((prevState) => !prevState);
  }
  
  const signupHandler =async (e)=>{
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
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCreds)
      })
      
      // if(!response.ok){
      //   throw new Error('SOmething went wrong')
      // }
      if(response.ok){
        setIsLoading((prevState) => !prevState);
      }

    }catch(error){
      console.log(error)
      alert('please enter correct creds')
    }
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
          {isLogin ? (isLoading ? <p className={classes.p}>Sending Request...</p> : <button onClick={handleLoading}>Login</button>) : <button onClick={signupHandler} >Sign Up</button>}
          {/* {isLoading && <p className={classes.p}>Sending Request...</p> } */}
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
