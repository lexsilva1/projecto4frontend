import classes from './Panels.module.css';
import React from 'react';
import { useState } from 'react';
import UserElement from './Users/UserElement';
import useStore from "../stores/Userstore";
import { useEffect } from 'react';
import useTaskStore from '../stores/TaskStore';
import TaskElement from './Task/TaskElement';


const Panels = ({users}) => {
    
const selected = useStore(state => state.selected);


    const panel1 = selected ? 'Developer' : 'To Do';
    const panel2 = selected ? 'Scrum Master' : 'Doing';
    const panel3 = selected ? 'Product Owner' : 'Done';
    const isDeleteSelected = useStore(state => state.isDeleteSelected);
    const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
    const fetchDeletedTasks = useTaskStore(state => state.fetchDeletedTasks);
    const tasks = useTaskStore(state => state.tasks);
    console.log(tasks);
    
useEffect(() => {
if(isDeleteSelected){
    useStore.getState().actions.fetchDeletedUsers();
}else{
    useStore.getState().actions.fetchUsers();
}
}, [isDeleteSelected]);
useEffect(() => {
if(isDeleteSelected){
    fetchDeletedTasks();
}else{
    fetchActiveTasks();
}
}, [isDeleteSelected]);


    return (
        <div className={classes.container}>
            <div className={classes.column}>
            <div className={classes.title}>
                <h2 className={classes.mainhome}>{panel1}</h2>
            </div>
            <div id='panel1' className={classes.panel}>
                {!selected &&tasks.map(task => (task.status === 10 && <TaskElement task= {task} />))}
                {selected && users.map(user => (user.role === 'developer' && <UserElement user= {user} />))}
                </div>
            </div>
            <div className={classes.column}>
            <div className={classes.title}>
            <h2 className={classes.mainhome}>{panel2}</h2>
            </div>
            <div id='panel2' className={classes.panel}>
                {!selected && tasks.map(task => (task.status === 20 && <TaskElement task= {task} />))}
                {selected && users.map(user => (user.role === 'ScrumMaster' && <UserElement user= {user} />))}
                </div>
            </div>
            <div className={classes.column}>
            <div className={classes.title}>
            <h2 className={classes.mainhome}>{panel3}</h2>
            </div>
            <div id='panel3' className={classes.panel}>
                {!selected && tasks.map(task => (task.status === 30 && <TaskElement task= {task} />))}
                {selected && users.map(user => (user.role === 'Owner' && <UserElement user= {user} />))}
                </div>
            </div>
        </div>
    );
};
export default Panels;