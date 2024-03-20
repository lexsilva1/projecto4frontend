import classes from './FilterCategories.module.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useTaskStore from '../../stores/TaskStore';

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
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "All";
    select.appendChild(defaultOption);
    data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.text = category.name;
        select.appendChild(option);
    });
}
const [selctedCategory, setSelectedCategory] = useState('');
const filterByCategory = useTaskStore(state => state.onFilterByCategory);
const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
async function handleFilter(category) {
    if(category === ""){
        fetchActiveTasks();
    }else{
        setSelectedCategory(category);
        filterByCategory(category);
    }

}


const handleChange = async (category) => {
    category === "" ? fetchActiveTasks() : handleFilter(category);
}



    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by category:</label>
            <select onChange={(e) => handleChange(e.target.value)} value={selctedCategory} className={classes.filter} id="filter" ></select>
        </div>
    );
}

export default FilterCategories;