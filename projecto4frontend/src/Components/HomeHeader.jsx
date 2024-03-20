import React from 'react';
import classes from './HomeHeader.module.css';
import DateTime from './DateTime';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import  logout from '../multimedia/logout.png';
import { useStore } from 'zustand';
import useTaskStore from '../stores/TaskStore';




const HomeHeader = ({ handleEditProfileIsOpen,updatedPhoto,updatedName }) => {
const username = sessionStorage.getItem("username");
const onFilterByUser = useTaskStore(state => state.onFilterByUser);
const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
const [mytasks, setMyTasks] = useState(false);



const navigate = useNavigate();
const [photo, setPhoto] = useState('');
useEffect(() => {
    userPicture();
}, [updatedPhoto]);
const [name, setName] = useState('');
useEffect(() => {
    userDto();
}, [updatedName]);


async function userDto() {
    await fetch("http://localhost:8080/projecto4backend/rest/user/myUserDto", {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
    })
    .then((response) => response.json())
    .then((data) => {
        
        const names = data.name.split(" ");
        setName(names[0]);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("username", data.username);  

        
    });
}

    
async function logout() {
    await fetch("http://localhost:8080/projecto4backend/rest/user/logout", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token"),
    },
  }).then(function (response) {

    if (response.status === 200) {
        sessionStorage.removeItem("token");
        navigate('/');
        }
    });
}


async function userPicture() {
    await fetch("http://localhost:8080/projecto4backend/rest/user/photo", {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
    })
    .then((response) => response.text())
    .then((data) => setPhoto(data));
}
 async function handleMyTasks (username) {
    if (!mytasks) {
        await onFilterByUser(username);
        setMyTasks(!mytasks);
    } else {
        await fetchActiveTasks();
        setMyTasks(!mytasks);
    }
}

        return (
            <header>
                <h1>Welcome to Scrum</h1>
                <DateTime />
                    <label onClick={() => handleMyTasks(username)}  className={classes.logout} >{mytasks ? 'All Tasks':'My Tasks'}</label>
                    <img id='profileImageHome' className={classes.profileImageHome} src={photo} alt="Avatar" />
                    <label className={classes.logout} onClick={handleEditProfileIsOpen}>{name}</label>
                    <button className={classes.logout} onClick={logout}>
                    <img src={logout} alt="Logout Icon" />
                    Logout
                </button>
            </header>
        );
    }

    export default HomeHeader;