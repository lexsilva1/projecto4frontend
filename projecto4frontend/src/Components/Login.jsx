import classes from'./Login.module.css';
import logo from '../multimedia/logo_scrum_01.png'
import Aside from './Aside'; 
import React, { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Success from './Toasts/Success';
import Warning from './Toasts/Warning';
import Error from './Toasts/Error';

function Login() {
    const navigate = useNavigate();

    const [AsideisOpen, setIsOpen] = useState(true);
    

    function handleAsideIsOpen(){
        setIsOpen(!AsideisOpen);

    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e){
        e.preventDefault();
        const response = await fetch('http://localhost:8080/projecto4backend/rest/users/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password   
            },
            
        });
        if(response.status === 200){
            const data = await response.text();
        Success('Welcome to Scrum');
        sessionStorage.setItem('token', data);
        navigate('/home');
    }else if(response.status === 403){
        Warning(await response.text());
    }else if( response.status === 404){
       Error(await response.text());
    }
}

    return(
        <div className={classes.centercontainer}>
                 <Aside isOpen={AsideisOpen}  />
                <div className={classes.loginpanel}>
                <img src={logo} alt='logo' height={150}/>
                <form>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input className={classes.input} type='text' id='username' placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label  htmlFor='password'>Password</label>
                        <input className={classes.input} type='password' id='password' placeholder='password' onChange={(e)=> setPassword(e.target.value)}  />
                    </div>
                    <button type='submit' onClick={handleLogin}>Sign In</button>
                </form>
                <p>or</p>
                <button onClick={handleAsideIsOpen}>Sign Up</button>
            </div>
        </div>
        
    );
}

export default Login;