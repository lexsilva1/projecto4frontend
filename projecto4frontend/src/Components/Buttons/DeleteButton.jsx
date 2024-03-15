import classes from './DeleteButton.module.css';
import React from 'react';
const DeleteButton = ({ handleDelete }) => {

    return (
        <button onClick={handleDelete}>Delete</button> 
    );
}

export default DeleteButton;