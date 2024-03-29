import React from "react";
import { useState } from "react";
import classes from "./UsersButton.module.css"; // Import the CSS module
import useStore from "../../stores/Userstore";
import useCategoriesStore from "../../stores/CategoriesStore";

const UsersButton = () => {
const setSelected = useStore(state => state.setSelected);
const selected = useStore(state => state.selected);
const setCategoriesOpen = useCategoriesStore(state => state.setCategoriesOpen);
const categoriesisOpen = useCategoriesStore(state => state.categoriesisOpen);
const isDeleteSelected = useStore(state => state.isDeleteSelected);
const setIsDeleteSelected = useStore(state => state.setIsDeleteSelected);
const users = useStore(state => state.users);
const setUsers = useStore(state => state.setUsers);

function handleclick() {
    setSelected(true);
    categoriesisOpen ? setCategoriesOpen() : '';
    useStore.getState().actions.fetchUsers();
    isDeleteSelected ? setIsDeleteSelected() : '';
    
}

    return (
        <button onClick={handleclick} className={`${classes.button} ${selected? classes.selected : ""}`}>
            Users
        </button>
    );
};

export default UsersButton;
