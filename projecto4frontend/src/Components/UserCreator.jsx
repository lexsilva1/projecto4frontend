import useStore from "../stores/Userstore";
import classes from "./UserCreator.module.css";
import { useState } from "react";
import userPicture from '../multimedia/profile.png';
import UserElement from "./Users/UserElement";
import warningToast from "./Toasts/Warning";
import successToast from "./Toasts/Success";
import errorToast from "./Toasts/Error";
import infoToast from "./Toasts/Info";

const UserCreator = () => {

    const [userPic, setUserPic] = useState(userPicture);
    function createElement(user){
        return <UserElement key={user.username} name={user.name} userPhoto={user.userPhoto} />;
    }

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
        const [userPhoto, setUserPhoto] = useState(userPicture);
        const [role, setRole] = useState('');

        async function handleRegister(e) {
            e.preventDefault();
            if(username === '' || password === '' || email === '' || firstname === '' || lastname === '' || contactNumber === '' || userPhoto === '' || role === ''){
                warningToast('All fields are required');
                return;
            }
            const user = { // Fix: Added missing curly braces to define the user object
                username: username,
                password: password,
                email: email,
                name: firstname + ' ' + lastname,
                contactNumber: contactNumber,
                userPhoto: userPhoto,
                role: role
            }; // Fix: Added semicolon to end the user object assignment
            const response = await fetch('http://localhost:8080/projecto4backend/rest/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.text();
            console.log(data);
            useStore.getState().actions.fetchUsers();
            clearInputs();
            

        }


      
function clearInputs(){
    setUsername('');
    setPassword('');
    setEmail('');
    setFirstname('');
    setLastname('');
    setContactNumber('');
    setUserPhoto(userPicture);
    setRole('');
    setUserPic(userPicture);
    document.querySelector('form').reset();
}


    return (
<aside  className={classes.asideOpen}>
    <h2>New User</h2>
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
        <div>
            <label  htmlFor='role'>Role</label>
            <select  id='role' name='role' onChange={(e) => setRole(e.target.value)}>
                <option value=''>Select Role</option>
                <option value='developer'>Developer</option>
                <option value='ScrumMaster'>Scrum Master</option>
                <option value='Owner'>Product Owner</option>
            </select>
        </div>
    </form>
    
        <button className={classes.button} type='submit' onClick={handleRegister}>Register</button>

    </aside>
    );
};

export default UserCreator;