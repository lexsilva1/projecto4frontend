import React from "react";
import { useState } from "react";
import classes from "./UsersButton.module.css"; // Import the CSS module
import useStore from "../../stores/Userstore";
import useCategoriesStore from "../../stores/CategoriesStore";

const RestoreButton = ({handleRestore}) => {

async function restoreUSer(username){
    await fetch(`http://localhost:8080/projecto4backend/rest/users/restore/${username}`, {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
    });
}



    return (
        <button onClick={handleRestore}>
           Restore
        </button>
    );
};

export default RestoreButton;