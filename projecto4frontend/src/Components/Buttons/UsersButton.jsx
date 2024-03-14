import React from "react";
import { useState } from "react";
import classes from "./UsersButton.module.css"; // Import the CSS module
import useStore from "../../stores/Userstore";

const UsersButton = () => {
const setSelected = useStore(state => state.setSelected);
const selected = useStore(state => state.selected);



    return (
        <button onClick={setSelected} className={`${classes.button} ${selected? classes.selected : ""}`}>
            Users
        </button>
    );
};

export default UsersButton;
