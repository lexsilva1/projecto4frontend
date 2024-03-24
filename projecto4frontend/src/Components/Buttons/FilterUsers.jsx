import classes from './FilterUsers.module.css';
import React from 'react';
import { useEffect } from 'react';
import useTaskStore from '../../stores/TaskStore';
import useStore from '../../stores/Userstore';

const FilterUsers = () => {

    const onFilterByUser = useTaskStore(state => state.onFilterByUser);
    const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
    const fetchAllUsers = useStore(state => state.fetchUsers);
    const users = useStore(state => state.users);



    const handleChange = async (username) => {
        if(username === ""){
            await fetchActiveTasks();
        }
        await onFilterByUser(username);
    }



    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by user:</label>
            <select onChange={(e) => handleChange(e.target.value)}  className={classes.filter} id="userfilter">
                <option value="">All</option>
                <option value="deleted">Deleted User</option>
                {users && users.map(user => <option key={user.username} value={user.username}>{user.name}</option>)}
            </select>
        </div>
    );
}

export default FilterUsers;