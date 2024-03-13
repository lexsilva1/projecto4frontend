import classes from './FilterUsers.module.css';
import React from 'react';
import { useEffect } from 'react';

const FilterUsers = ({ handleFilter }) => {

    useEffect(() => {
        fetchUsers();
    }
        , []);

        async function fetchUsers() {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/user/all", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        const data = await response.json();
        const select = document.getElementById("userfilter");
        select.innerHTML = ""; // Clear the select options before adding new ones
        data.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.username;
            option.text = user.name;
            select.appendChild(option);
        });

    }


    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by user:</label>
            <select className={classes.filter} id="userfilter"></select>
        </div>
    );
}

export default FilterUsers;