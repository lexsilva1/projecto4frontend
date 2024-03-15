import classes from './DeletedButton.module.css';
import React from 'react';
import useStore from '../../stores/Userstore';
import { useEffect } from 'react';

const DeletedButton = () => {


const handleDelete = () => {
setIsDeleteSelected();
useStore.getState().actions.fetchDeletedUsers();
}

const isDeleteSelected = useStore(state => state.isDeleteSelected);
const setIsDeleteSelected = useStore(state => state.setIsDeleteSelected);
    return (
        <button onClick={handleDelete}  className={`${classes.button} ${isDeleteSelected? classes.selected : ""}`}>
            Deleted
        </button>
    );
};
export default DeletedButton;