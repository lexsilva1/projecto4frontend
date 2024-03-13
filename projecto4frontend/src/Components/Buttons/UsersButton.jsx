import React from "react";
import { useState } from "react";
import classes from "./UsersButton.module.css"; // Import the CSS module

const UsersButton = ({ handleSelected, selected, handleButtonClicked }) => {
    return (
        <button onClick={() => {handleSelected(), handleButtonClicked()}} className={`${classes.button} ${selected? classes.selected : ""}`}>
            Users
        </button>
    );
};

export default UsersButton;
