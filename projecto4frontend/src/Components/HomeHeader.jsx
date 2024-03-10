import React from 'react';
import classes from './HomeHeader.module.css';
import DateTime from './DateTime';
import  logout from '../multimedia/logout.png';


    const HomeHeader = () => {
        return (
            <header>
                <h1>Welcome to Scrum</h1>
                <DateTime />
                <label className={classes.logout}>My Tasks</label>
                <img id="profileImageHome" src="" alt="Avatar" />
                <label className={classes.logout}></label>
            
                <button className={classes.logout}>
                    <img src={logout} alt="Logout Icon" />
                    Logout
                </button>
            </header>
        );
    };

    export default HomeHeader;