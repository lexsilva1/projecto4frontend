import React from "react";
import classes from './EditTaskMain.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCategoriesStore from "../../stores/CategoriesStore";
import useTaskStore from "../../stores/TaskStore";
import { useEffect } from "react";

const EditTaskMain = () => {
    const [clickedPriority, setClickedPriority] = useState('');
    const [clickedStatus, setClickedStatus] = useState('');
    
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
    const select = document.getElementById("categoryEditTask");
    select.innerHTML = ""; // Clear the select options before adding new ones
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "";
    select.appendChild(defaultOption);
    data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.text = category.name;
        select.appendChild(option);
    });
}

    const setSelectedStatus = (status) => {
        return () => {
            setClickedStatus(status);
            console.log(status);
        }
    }
    const setSelectdPriority = (priority) => {
        return () => {
            setClickedPriority(priority);
            console.log(priority);
        }
    }

    const navigate = useNavigate();
    const handleCancel = () =>{
        navigate('/home');
    }
  return (
    <main className={classes.maintask}>
        <div className={classes.detalhesTask}>
            <div className={classes.breadcrumb}>
                <ul>
                  <li onClick={handleCancel} id="link-bc"><a href="home.html">Back</a></li>
                </ul>
                <label id="taskCreator">TASK CREATOR:</label>
              </div>
              <div>
                <label className={classes.labelEditTask} for="titulo-task">TITLE</label> 
                <textarea className={classes.title} id="titulo-task">Task 1</textarea>
            </div>
            <div>
                <label className={classes.labelEditTask} for="descricao-task">DESCRIPTION</label> 
                <textarea className={classes.description} id="descricao-task"></textarea>
            </div>
           
            <p id="warningMessage3"></p>
            <div className={classes.tasksave}>
                <button  id="save-button">Save</button>
                <button onClick={handleCancel}  id="cancel-button">Cancel</button>
            </div>
        </div>
        <div className={classes.taskbuttons}>
            <div className={classes.statusandpriority}>
                <div class="task-status">
                    <h4 className={classes.taskH4}>status</h4>
                    <div className={classes.statusbuttons}>
                        <button onClick={setSelectedStatus(10)} className={`${classes.statusbutton} ${classes.todo} ${clickedStatus===10? classes.selected : ''}`} id="todo-button">To do</button>
                        <button onClick={setSelectedStatus(20)} className={`${classes.statusbutton} ${classes.doing} ${clickedStatus===20? classes.selected : ''}`} id="doing-button">Doing</button>
                        <button onClick={setSelectedStatus(30)} className={`${classes.statusbutton} ${classes.done} ${clickedStatus===30? classes.selected : ''}`} id="done-button">Done</button>
                    </div>
                </div>        
                <div className={classes.taskpriority}>
                    <h4 className={classes.taskH4}>priority</h4>
                    <div className={classes.prioritybuttons}>
                        <button onClick={setSelectdPriority(100)}  className={`${classes.prioritybutton} ${classes.low} ${clickedPriority===100? classes.selected : ''}`} id="low-button">Low</button>
                        <button onClick={setSelectdPriority(200)} className={`${classes.prioritybutton} ${classes.medium} ${clickedPriority===200? classes.selected : ''}`}  id="medium-button">Medium</button>
                        <button onClick={setSelectdPriority(300)} className={`${classes.prioritybutton} ${classes.high} ${clickedPriority===300? classes.selected : ''}`} id="high-button">High</button>
                    </div>
                </div>
                <div id="taskDate">
                    <div>
                        <label className={classes.labelEditTask} for="startdate">INITIAL DATE</label>
                        <input className={classes.dateinput} id ="startdateEditTask" type ="date" placeholder="Start-date" />
                    </div>
                    <div>
                        <label className={classes.labelEditTask} for="enddate">FINAL DATE</label>
                        <input className={classes.dateinput} id ="enddateEditTask" type ="date" placeholder="End-date" />
                            
                    </div>
                    <div>
                        <label className={classes.labelEditTask}
                         for="category">CATEGORY</label>
                        <select id="categoryEditTask"></select>
                      </div>
                </div>
            </div>
        </div>
    </main>
    );
}

export default EditTaskMain;