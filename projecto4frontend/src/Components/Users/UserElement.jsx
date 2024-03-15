import classes from './UserElement.module.css';
import React from 'react';
import useStore from "../../stores/Userstore";
import DeleteButton from '../Buttons/DeleteButton';

function UserElement({ user }) {
    const setIsProfilesOpen = useStore(state => state.setIsProfilesOpen);
    const setSelectedUser = useStore(state => state.setSelectedUser);
    const isActive = user.active;

    const handleClick = () => {
        setSelectedUser(user);
        setIsProfilesOpen();
    };
   

  

    return (
        <div onClick={handleClick} className={`${classes.user}${!isActive ? " " + classes.deleted : ""}`}  >
            <img  className={classes.userPhoto} src={user.userPhoto} alt={user.name} />
            <h2 className={classes.mainhome}>{user.name}</h2>
            
        </div>
    );
}

export default UserElement;
