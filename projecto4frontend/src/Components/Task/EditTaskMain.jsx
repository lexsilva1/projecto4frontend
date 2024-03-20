import React from "react";
import classes from './EditTaskMain.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useCategoriesStore from "../../stores/CategoriesStore";
import useTaskStore from "../../stores/TaskStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditTaskMain = () => {
    const { id } = useParams();
    const username= sessionStorage.getItem('username');
    const [clickedPriority, setClickedPriority] = useState('');
    const [clickedStatus, setClickedStatus] = useState('');
    const role = sessionStorage.getItem('role');
    const categories = useCategoriesStore(state => state.categories);
    const editedTask = useTaskStore(state => state.editedTask);
    const setEditedTask = useTaskStore(state => state.setEditedTask);
    const editedTaskId = useTaskStore(state => state.editedTaskId);
    const fetchTaskById = useTaskStore(state => state.fetchTaskById);
    const taskCreator = useTaskStore(state => state.taskCreator);
    const setTaskCreator = useTaskStore(state => state.setTaskCreator);
    const fetchTaskCreator = useTaskStore(state => state.fetchTaskCreator);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const onUpdateTask = useTaskStore(state => state.onUpdateTask);



const fetchData = async () => {
    const editedTaskData = await fetchTaskById(id); // Fetch task asynchronously
    setEditedTask(editedTaskData);  // Set the fetched task to the state
    const creatorData = await fetchTaskCreator(id); // Fetch task creator asynchronously
    setTaskCreator(creatorData); // Set the fetched task creator to the state
    setTaskTitle(editedTaskData.title);
    setTaskDescription(editedTaskData.description);
    setTaskStartDate(editedTaskData.startDate);
    setTaskEndDate(editedTaskData.endDate);
    setTaskCategory(editedTaskData.category);
    setCategories();
    setTaskCategory(editedTaskData.category);
    if (editedTaskData.status === 10) {
        setClickedStatus(10);
    } else if (editedTaskData.status === 20) {
        setClickedStatus(20);
    } else if (editedTaskData.status === 30) {
        setClickedStatus(30);
    }
    if (editedTaskData.priority === 100) {
        setClickedPriority(100);
    } else if (editedTaskData.priority === 200) {
        setClickedPriority(200);
    } else if (editedTaskData.priority === 300) {
        setClickedPriority(300);
    }
    setTaskStartDate(editedTaskData.startDate);
    if(editedTaskData.endDate === '2199-12-31'){
        setTaskEndDate('');
    } else {
        setTaskEndDate(editedTaskData.endDate);
    }
    
}


useEffect(  () => {
    fetchData();

    }, []);
console.log(id);


 
async function setCategories(){
await useCategoriesStore.getState().actions.fetchCategories(); // Fetch categories asynchronously    
}


const setSelectedStatus = (status) => {
    return () => {
        setClickedStatus(status);
        setTaskStatus(status);
    }
}
const setSelectdPriority = (priority) => {
    return () => {
        setClickedPriority(priority);
        setTaskPriority(priority);
    }
}

    const navigate = useNavigate();
    const handleCancel = () =>{
        navigate('/home');
    }
const handleSaveTask = async () => { 
    if (taskTitle === '' || taskDescription === '' || taskCategory === '' ) {
        document.getElementById('warningMessage3').innerHTML = 'All fields are required';
        return;
    }    
        if (taskStartDate > taskEndDate) {
           if(taskEndDate !== '') {    
            document.getElementById('warningMessage3').innerHTML = 'Start date must be before end date';
            return;
    }else{
        setTaskEndDate('2199-12-31');
        const task = {
            id: id,
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            priority: clickedPriority,
            startDate: taskStartDate,
            endDate: '2199-12-31',
            status: clickedStatus,
        };
        console.log(task);
        await onUpdateTask(task);
        navigate('/home');
    }    
}else{


    const task = {
        id: id,
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        priority: clickedPriority,
        startDate: taskStartDate,
        endDate: taskEndDate,
        status: clickedStatus,
    };
    await onUpdateTask(task);
    navigate('/home');
}
}
  return (
    <main className={classes.maintask}>
        <div className={classes.detalhesTask}>
        {taskCreator ? (
            <div className={classes.breadcrumb}>
                <ul className={classes.breadcrumb}>
                  <li className={classes.breadcrumb} onClick={handleCancel} id="link-bc">Back</li>
                  
                  <li classname ={classes.taskCreator} id="taskCreator">TASK CREATOR:{taskCreator.name}</li>
                    </ul>
              </div>
              ) : <p>Loading...</p>}
               {taskCreator ? (
              <div>
                <label className={classes.labelEditTask} for="titulo-task">TITLE</label> 
                <textarea  
                onChange={(e) => setTaskTitle(e.target.value)} 
                value={taskTitle} 
                className={classes.title} 
                id="titulo-task"
               readOnly = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''} 
                ></textarea>
            </div>
            ) : <p>Loading...</p>}
            {taskCreator ? (
            <div>
                <label className={classes.labelEditTask} htmlFor="descricao-task">DESCRIPTION</label> 
                <textarea onChange={(e) => setTaskDescription(e.target.value)} 
                value={taskDescription} 
                className={classes.description} 
                id="descricao-task"
                readOnly = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                ></textarea>
            </div>
            ) : <p>Loading...</p>}
            <p className={classes.warningMessage3} id="warningMessage3"></p>
            {taskCreator ? (
            <div className={classes.tasksave}>
                <button onClick={handleSaveTask}  id="save-button">Save</button>
                <button onClick={handleCancel}  id="cancel-button">Cancel</button>
            </div>
            ) : <p>Loading...</p>}
        </div>
        {taskCreator ? (
        <div className={classes.taskbuttons}>
            <div className={classes.statusandpriority}>
                <div class="task-status">
                    <h4 className={classes.taskH4}>status</h4>
                    <div className={classes.statusbuttons}>
                        <button 
                        onClick={setSelectedStatus(10)} 
                        className={`${classes.statusbutton} ${classes.todo} ${clickedStatus===10? classes.selected : ''}`} 
                        id="todo-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >To do</button>
                        <button 
                        onClick={setSelectedStatus(20)} 
                        className={`${classes.statusbutton} ${classes.doing} ${clickedStatus===20? classes.selected : ''}`} 
                        id="doing-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >Doing</button>
                        <button 
                        onClick={setSelectedStatus(30)} 
                        className={`${classes.statusbutton} ${classes.done} ${clickedStatus===30? classes.selected : ''}`} 
                        id="done-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >Done</button>
                    </div>
                </div>        
                <div className={classes.taskpriority}>
                    <h4 className={classes.taskH4}>priority</h4>
                    <div className={classes.prioritybuttons}>
                        <button 
                        onClick={setSelectdPriority(100)} 
                        className={`${classes.prioritybutton} ${classes.low} ${clickedPriority===100? classes.selected : ''}`} 
                        id="low-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >Low</button>
                        <button 
                        onClick={setSelectdPriority(200)} 
                        className={`${classes.prioritybutton} ${classes.medium} ${clickedPriority===200? classes.selected : ''}`}  
                        id="medium-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >Medium</button>
                        <button 
                        onClick={setSelectdPriority(300)} 
                        className={`${classes.prioritybutton} ${classes.high} ${clickedPriority===300? classes.selected : ''}`} 
                        id="high-button"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >High</button>
                    </div>
                </div>
                <div className={classes.taskDate} id="taskDate">
                    <div>
                        <label className={`${classes.labelEditTask} ${classes.taskDate}`} for="startdate">INITIAL DATE</label>
                        <input 
                        onChange={(e) => setTaskStartDate(e.target.value)} 
                        value={taskStartDate} className={`${classes.dateinput} ${classes.taskDate}`} 
                        id ="startdateEditTask" 
                        type ="date" 
                        placeholder="Start-date"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                         />
                    </div>
                    <div>
                        <label className={`${classes.labelEditTask} ${classes.taskDate}`} for="enddate">FINAL DATE</label>
                        <input 
                        onChange={(e) => e.target.value === '' ? setTaskEndDate(editedTask.endDate):setTaskEndDate(e.target.value)} 
                        value={taskEndDate } 
                        className={`${classes.dateinput} ${classes.taskDate}`} 
                        id ="enddateEditTask" 
                        type ="date" 
                        placeholder="End-date"
                        disabled = {taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                         />
                        </div>
                        {categories && (
                    <div>
                        <label className={classes.labelEditTask}
                         for="category">CATEGORY</label>
                       {categories && <select 
                            className={classes.taskDate} 
                            onChange={(e) => setTaskCategory(e.target.value)} 
                            value={taskCategory} 
                            id="categoryEditTask"
                            disabled={taskCreator.username !== username && role === 'developer' ? 'disabled' : ''}
                        >
                            {...categories.map((category) => (
                                <option value={category.name} key={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>}
                      </div>
                        )}
                </div>
            </div>
        </div>
        ) : <p>Loading...</p>}
    </main>
    );
}

export default EditTaskMain;