import React from "react";  
import classes from './DeleteAllTasksButton.module.css';
import useTaskStore from "../../stores/TaskStore";
import useStore from "../../stores/Userstore";

const DeleteAllTasksButton = () => {

const onDeleteAllUsersTasks = useTaskStore(state => state.onDeleteAllUsersTasks);
const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
const selectedUser = useStore(state => state.selectedUser);

const handleDeleteAllTasks = async () => {
    console.log(selectedUser);
    await onDeleteAllUsersTasks(selectedUser.username);
    await fetchActiveTasks();
}

    return (
        <button onClick={handleDeleteAllTasks} className={classes.deleteAllTasksButton}>Delete All Tasks</button>
    )
}

export default DeleteAllTasksButton;