import classes from './Panels.module.css';
import React from 'react';
import { useState } from 'react';
import UserElement from './Users/UserElement';


const Panels = ({selected,users}) => {

    const panel1 = selected ? 'Developer' : 'To Do';
    const panel2 = selected ? 'Scrum Master' : 'Doing';
    const panel3 = selected ? 'Product Owner' : 'Done';
       

    return (
        <div className={classes.container}>
            <div id='panel1' className={classes.panel}>
                <h2 className={classes.mainhome}>{panel1}</h2>
                {selected && users.map(user => (user.role === 'developer' && <UserElement key={user.username} name={user.name} userPhoto={user.userPhoto} />))}
            </div>
            <div id='panel2' className={classes.panel}>
                <h2 className={classes.mainhome}>{panel2}</h2>
                <div>
                {selected && users.map(user => (user.role === 'ScrumMaster' && <UserElement key={user.username} name={user.name} userPhoto={user.userPhoto} />))}
                </div>
            </div>
            <div id='panel3' className={classes.panel}>
                <h2 className={classes.mainhome}>{panel3}</h2>
                {selected && users.map(user => (user.role === 'Owner' && <UserElement key={user.username} name={user.name} userPhoto={user.userPhoto} />))}
            </div>
        </div>
    );
};
export default Panels;