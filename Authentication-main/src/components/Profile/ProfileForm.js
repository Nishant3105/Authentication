import {useRef} from 'react' 
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';


const ProfileForm = () => {
  const passwordRef=useRef()
  
  const token=localStorage.getItem('token')

  const history=useHistory()

  
  const submitHandler=async (e)=>{
    try{
      e.preventDefault()
      const enteredPassword=passwordRef.current.value
      const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDk6BaMAPvSu4Boffm_G3IV3dU7lcV03HA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken:token,
          password:enteredPassword,
          secureReferenceToken: true
        })
      })
      if(!response.ok){
        throw new Error('Invalid token!!!')
      }
      // const data=response.json()
      if(response.ok){
        history.replace('/')
      }
    }catch(error){
      console.log(error.message)
      alert(error.message)
    }
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
