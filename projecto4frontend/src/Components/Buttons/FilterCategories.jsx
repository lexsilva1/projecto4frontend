import classes from './FilterCategories.module.css';
import React, { useEffect } from 'react';

const FilterCategories = () => {

useEffect(() => {
    getCategories();
}, []);

async function getCategories() {    
    const response = await fetch("http://localhost:8080/projecto4backend/rest/task/allCategories", {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
    });
    const data = await response.json();
    const select = document.getElementById("filter");
    select.innerHTML = ""; // Clear the select options before adding new ones
    data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
    });
}

    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by category:</label>
            <select className={classes.filter} id="filter" ></select>
        </div>
    );
}

export default FilterCategories;