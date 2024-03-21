
import React, { useState, useEffect } from 'react';
import classes from './TaskCreator.module.css';
import useTaskStore from '../stores/TaskStore';
import useCategoriesStore from '../stores/CategoriesStore';
import { toast, Bounce } from 'react-toastify';
import infoToast from './Toasts/Info';




const TaskCreator = () => {
const [category, setCategory] = useState('');
const onAddTask = useTaskStore(state => state.onAddTask);
const [priority, setPriority] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [clickedPriority, setClickedPriority] = useState('');
const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
const fetchCategories = useCategoriesStore(state => state.fetchCategories);
const categories = useCategoriesStore(state => state.categories);




const setSelectdPriority = (priority) => {
    return () => {
        setPriority(priority);
        setClickedPriority(priority);
    };
}
function clearInputs(){
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('');
    setStartDate('');
    setEndDate('');
    setClickedPriority('');
    document.getElementById('warningMessage2').innerHTML = '';
    document.getElementById('low-button-home').classList.remove(classes.selected);
    document.getElementById('medium-button-home').classList.remove(classes.selected);
    document.getElementById('high-button-home').classList.remove(classes.selected);
    document.getElementById('startdate').value = '';
    document.getElementById('enddate').value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
}


async function handleAddTask(e) {
    e.preventDefault();
    console.log('title', title);
    if (title === '' || description === '' || category === '' ) {
        infoToast('Title, description and category are required');
    } else {
        if (endDate === '') {
            console.log('end date', endDate);
            const task = {
                title: title,
                description: description,
                category: category,
                priority: priority === '' ? 100 : priority,
                startDate: startDate === '' ? new Date().toISOString().split('T')[0] : startDate,
                endDate: endDate === '' ? '2199-12-31' : endDate,
            };
            console.log('Creating task...', task);
            await onAddTask(task);
            fetchActiveTasks();
            clearInputs();
        

    } else if (startDate > endDate) {
        console.log('end date', endDate);
        infoToast('End date must be greater than start date');
        
    } else {
        const task = {
            title: title,
            description: description,
            category: category,
            priority: priority === '' ? 100 : priority,
            startDate: startDate === '' ? new Date().toISOString().split('T')[0] : startDate,
            endDate: endDate === '' ? '2199-12-31' : endDate,
        };
        console.log('Creating task...', task);
        await onAddTask(task);
        fetchActiveTasks();
        clearInputs();
    }
}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id='taskTitle'
                />
                <textarea
                    className={classes.taskDescription}
                    placeholder="Description (required)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id='taskDescription'
                ></textarea>
                <br />
                <label htmlFor="taskCategory">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} id="taskCategory">
                    <option value="">Select category</option>
                    {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                </select>
                <br />
                <label>Priority</label>
                <div className={classes.prioritydiv}>
                <button onClick={setSelectdPriority(100)}  className={`${classes.priorityButtonHome} ${classes.low} ${clickedPriority===100? classes.selected : ''}`} id="low-button-home">
                    Low
                </button>
                <button onClick={setSelectdPriority(200)} className={`${classes.priorityButtonHome} ${classes.medium} ${clickedPriority===200? classes.selected : ''}`} id="medium-button-home">
                    Medium
                </button>
                <button onClick={setSelectdPriority(300)} className={`${classes.priorityButtonHome} ${classes.high} ${clickedPriority===300? classes.selected : ''}`} id="high-button-home">
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
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                    }
                }
                />
                <label htmlFor="enddate">Final Date</label>
                <input
                    className={classes.dateinput}
                    id="enddate"
                    type="date"
                    placeholder="End-date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                    }
                }
                />
            </div>
            <button onClick={handleAddTask} className={classes.addTask} >Add task</button>
        
            <p id="warningMessage2"></p>
        </aside>
    );
};

export default TaskCreator;