import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import React, { useContext } from 'react'
import AuthContext from '../../store/AuthContext';

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext)
  const logOutHandler = () => {
    AuthCtx.logout()
    localStorage.removeItem('token')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!AuthCtx.isLoggedIn &&
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          }
          {AuthCtx.isLoggedIn &&
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          }
          {AuthCtx.isLoggedIn &&
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
