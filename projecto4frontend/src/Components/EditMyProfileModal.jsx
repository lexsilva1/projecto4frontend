import { useState } from 'react';
import { useEffect } from 'react';
import classes from './EditMyProfileModal.module.css';


const EditMyProfileModal = ({ EditProfileIsOpen, handleEditProfileIsOpen, onUpdatedInfo }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');



    useEffect(() => {
        async function userDto() {
            const response = await fetch('http://localhost:8080/projecto4backend/rest/users/myUserDto', {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    token: sessionStorage.getItem('token'),
                },
            });
            const data = await response.json();
            const names=data.name.split(' ');
            setFirstName(names[0]);
            setLastName(names[1]);
            setEmail(data.email);
            setUsername(data.username);
            setContact(data.contactNumber);
            setUserPicture(data.userPhoto);
            setRole(data.role);
        }

        if (EditProfileIsOpen) {
            userDto();
        }
    }, [EditProfileIsOpen]);

    async function handleUpdateUser() {
        let userupdated = false;
        if(password !== rePassword && newPassword===rePassword && password !== '' && rePassword !== ''&& newPassword !== ''){
        await updateUser();
        const updatedName = firstName;
        const updatedPhoto = userPicture;
        onUpdatedInfo(updatedName, updatedPhoto);
        await updatePassword();
        userupdated = true;
        }else{
        await updateUser();
        const updatedName = firstName;
        const updatedPhoto = userPicture;
        onUpdatedInfo(updatedName, updatedPhoto);
        userupdated = true;
        }
        if(userupdated){
            handleEditProfileIsOpen();
        }
    }


  async function updatePassword() {
        
        if (password !== rePassword && newPassword===rePassword && password !== '' && rePassword !== ''&& newPassword !== '') {
            const passwordDto = {
                password: password,
                newPassword: newPassword,
            };
            const response = await fetch('http://localhost:8080/projecto4backend/rest/users/password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    token: sessionStorage.getItem('token'),
                },
                body: JSON.stringify(passwordDto),
            });
            const data = await response.text();
            console.log(data);
        } else {
            alert('Passwords do not match');
        }
    }
    async function updateUser() {
       
        const user = {
            username: username,
            email: email,
            name: firstName + ' ' + lastName,
            contactNumber: contact,
            userPhoto: userPicture,
        };
        const response = await fetch('http://localhost:8080/projecto4backend/rest/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: sessionStorage.getItem('token'),
            },
            body: JSON.stringify(user),
        }).catch((error) => {
            console.error('Error:', error);
        });
        const data = await response.text();
        console.log(data);
    }

    return (
        <div>
            {EditProfileIsOpen && (
                <div id="myModal" className={classes.modal}>
                    <div className={classes.modalcontent}>
                        <span className={classes.close} id="adduserclose" onClick={handleEditProfileIsOpen}>
                            &times;
                        </span>
                        <form id="addUserForm">
                            <h1 className={classes.title} id="modalTitle">
                                My Profile
                            </h1>
                            <div className="form-fields">
                                <div className={classes.formfields}>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="firstNameModal"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="lastNameModal"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="emailModal"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="usernameModal"
                                        name="username"
                                        value={username}
                                        readOnly
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="contact">Contact:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="contactModal"
                                        name="contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="userPicture">User Picture:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="userPictureModal"
                                        name="userPicture"
                                        value={userPicture}
                                        onChange={(e) => setUserPicture(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="role">Role</label>
                                    <input
                                        className={classes.formfield}
                                        id="role"
                                        name="role"
                                        value={role}
                                        readOnly
                                    ></input>
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        className={classes.formfield}
                                        type="password"
                                        id="passwordModal"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="newPassword">New Password:</label>
                                    <input
                                        className={classes.formfield}
                                        type="password"
                                        id="newPasswordModal"
                                        name="rePassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="rePassword">Re-Write New Password:</label>
                                    <input
                                        className={classes.formfield}
                                        type="password"
                                        id="rePasswordModal"
                                        name="rePassword"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <button onClick={(e) => {e.preventDefault(); handleUpdateUser(); }} type="submit" id="updateUser" value="Submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <img className={classes.userPic} id="userPicturePreview" src={userPicture} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditMyProfileModal;

