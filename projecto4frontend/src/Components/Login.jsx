import classes from'./Login.module.css';
import logo from '../multimedia/logo_scrum_01.png'
import Aside from './Aside'; 
import React, { useState } from 'react';

function Login() {

    const [AsideisOpen, setIsOpen] = useState(true);
    

    function handleAsideIsOpen(){
        setIsOpen(!AsideisOpen);

    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e){
        e.preventDefault();
        const response = await fetch('http://localhost:8080/projecto4backend/rest/user/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': username,
                'password': password   
            },
            
        });
        const data = await response.text();
        console.log(data);
    }

    return(
        <div className={classes.centercontainer}>
                <img src={logo} alt='logo' height={150}/>
                 <Aside isOpen={AsideisOpen}  />
                <div className={classes.loginpanel}>
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