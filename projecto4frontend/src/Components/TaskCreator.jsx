
import React, { useState, useEffect } from 'react';
import classes from './TaskCreator.module.css';
import { useNavigate } from 'react-router-dom';



const TaskCreator = () => {
const navigate = useNavigate();
const [category, setCategory] = useState('');
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
    const select = document.getElementById("taskCategory");
    select.innerHTML = ""; // Clear the select options before adding new ones
    data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
    });
}

    return (
        <aside className={classes.asideOpen}>
            <h3>Add task</h3>
            <div>
                <input
                    type="text"
                    className={classes.taskName}
                    placeholder="Title (required)"
                    maxLength="15"
                />
                <textarea
                    className={classes.taskDescription}
                    placeholder="Description (required)"
                ></textarea>
                <br />
                <label htmlFor="taskCategory">Category</label>
                <select id="taskCategory"></select>
                <br />
                <label>Priority</label>
                <div className={classes.prioritydiv}>
                <button className={`${classes.priorityButtonHome} ${classes.low}`} id="low-button-home">
                    Low
                </button>
                <button className={`${classes.priorityButtonHome} ${classes.medium}`} id="medium-button-home">
                    Medium
                </button>
                <button className={`${classes.priorityButtonHome} ${classes.high}`} id="high-button-home">
                    High
                </button>
                </div>
            </div>
            <div>
                <label htmlFor="startdate">Initial Date</label>
                <input
                    className={classes.dateinput}
                    id="startdate"
                    type="date"
                    placeholder="Start-date"
                />
                <label htmlFor="enddate">Final Date</label>
                <input
                    className={classes.dateinput}
                    id="enddate"
                    type="date"
                    placeholder="End-date"
                />
            </div>
            <button className={classes.addTask}>Add task</button>
            <p id="warningMessage2"></p>
        </aside>
    );
};

export default TaskCreator;