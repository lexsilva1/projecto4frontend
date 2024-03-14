import classes from './UserElement.module.css';
import React from 'react';
import { useState } from 'react';
import UserProfiles from './UserProfiles';

function UserElement ({ userPhoto, name}) {


    
    return (
        <div className={classes.user}>
            <img className={classes.userPhoto} src={userPhoto} alt={name} />
            <h2 className={classes.mainhome}>{name}</h2>
        </div>
        

    );
}

export default UserElement;