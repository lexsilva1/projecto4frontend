import classes from './UserElement.module.css';
import React from 'react';
import useStore from "../../stores/Userstore";

function UserElement({ user }) {
    const setIsProfilesOpen = useStore(state => state.setIsProfilesOpen);
    const setSelectedUser = useStore(state => state.setSelectedUser);

    const handleClick = () => {
        setSelectedUser(user);
        setIsProfilesOpen();
    };

    return (
        <div onClick={handleClick} className={classes.user}>
            <img className={classes.userPhoto} src={user.userPhoto} alt={user.name} />
            <h2 className={classes.mainhome}>{user.name}</h2>
        </div>
    );
}

export default UserElement;
