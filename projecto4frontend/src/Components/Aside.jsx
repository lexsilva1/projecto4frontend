import React, { useState } from 'react';
import classes from './Aside.module.css';
import userPicture from '../multimedia/profile.png';

const Aside = ({isOpen}) => {
    const [userPic, setUserPic] = useState(userPicture);

    function handleUserPic(e){
        if(e.target.value === ''){
            setUserPic(userPicture);
        }else{
        setUserPic(e.target.value);
        setUserPhoto(e.target.value);
        }
      }

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState('');
        const [firstname, setFirstname] = useState('');
        const [lastname, setLastname] = useState('');
        const [contactNumber, setContactNumber] = useState('');
        const [userPhoto, setUserPhoto] = useState('');

        async function handleRegister(e) {
            e.preventDefault();
            const user = { // Fix: Added missing curly braces to define the user object
                username: username,
                password: password,
                email: email,
                name: firstname + ' ' + lastname,
                contactNumber: contactNumber,
                userPhoto: userPhoto
            }; // Fix: Added semicolon to end the user object assignment
            const response = await fetch('http://localhost:8080/projecto4backend/rest/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.text();
            console.log(data);
        }

    
    
    return (
<aside id='harmonia' className={isOpen ? classes.asideClose : classes.asideOpen}>
    <h2>Register as a Dev</h2>
    <img src={userPic} className={classes.userPic} />
    <form>
        <div>
            <label htmlFor='username'>Username</label>
            <input className={classes.input} type='text' id='username' placeholder='username' onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div>
            <label  htmlFor='password'>Password</label>
            <input className={classes.input} type='password' id='password' placeholder='password'onChange={(e)=> setPassword(e.target.value)}  />
        </div>
        <div>
            <label  htmlFor='email'>Email</label>
            <input className={classes.input} type='email' id='email' placeholder='email' onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <div>
            <label  htmlFor='firstname'>First Name</label>
            <input className={classes.input} type='text' id='firstname' placeholder='First Name' onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div>
            <label  htmlFor='lastname'>Last Name</label>
            <input className={classes.input} type='text' id='lastname' placeholder='Last Name' onChange={(e) => setLastname(e.target.value)}  />
        </div>
        <div>
            <label  htmlFor='contactNumber'>Contact</label>
            <input className={classes.input} type='text' id='contactNumber' placeholder='Contact' onChange={(e) => setContactNumber(e.target.value)} />
        </div>
        <div>
            <label htmlFor='userPhoto'>User Photo</label>
            <input className={classes.input} type='text' id='userPhoto' placeholder='insert url' onChange={handleUserPic} />
        </div>
    </form>
    
        <button className={classes.button} type='submit' onClick={handleRegister}>Register</button>

    </aside>
    );
}
export default Aside;