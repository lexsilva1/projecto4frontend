import classes from './UserProfiles.module.css';
import useStore from "../../stores/Userstore";
import { useState } from 'react';
import DeleteButton from '../Buttons/DeleteButton'; 
import RestoreButton from '../Buttons/RestoreButton';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import DeleteAllTasksButton from '../Buttons/DeleteAllTasksButton';
const UserProfiles = () => {
    const loggedRole = sessionStorage.getItem('role');
    const isProfilesOpen = useStore(state => state.isProfilesOpen);
    const setIsProfilesOpen = useStore(state => state.setIsProfilesOpen);

    const selectedUser = useStore(state => state.selectedUser);
    const setSelectedUser = useStore(state => state.setSelectedUser);
    const names= selectedUser.name.split(" ");
    const isDeleteSelected = useStore(state => state.isDeleteSelected);
    const setIsDeleteSelected = useStore(state => state.setIsDeleteSelected);


    const [firstName, setFirstName] = useState(names[0]);
    const [lastName, setLastName] = useState(names[1]);
    const [email, setEmail] = useState(selectedUser.email);
    const [contact, setContact] = useState(selectedUser.contactNumber);
    const [userPicture, setUserPicture] = useState(selectedUser.userPhoto);
    const [role, setRole] = useState(selectedUser.role);

    async function deleteUser(username) {

        await fetch(`http://localhost:8080/projecto4backend/rest/user/delete/${username}`, {
            method: "DELETE",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        useStore.getState().actions.fetchDeletedUsers();
    }
    async function restoreUSer(username){
        await fetch(`http://localhost:8080/projecto4backend/rest/user/restore/${username}`, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        useStore.getState().actions.fetchUsers();
    }

const handleDelete = (e) => {
        e.preventDefault();
        setIsDeleteSelected();
    deleteUser(selectedUser.username);
    setSelectedUser('');
    setIsProfilesOpen();
        
    }
const handleRestore = (e) => {
        e.preventDefault();
        setIsDeleteSelected();
    restoreUSer(selectedUser.username);
    setSelectedUser('');
    setIsProfilesOpen();  
    }  

   async function handleUpdateUser() {
        const user = {
            id: selectedUser.id,
            name: firstName + " " + lastName,
            email: email,
            contactNumber: contact,
            userPhoto: userPicture,
            role: role,
            username: selectedUser.username,
        };
        await fetch("http://localhost:8080/projecto4backend/rest/user/update", {
            method: "PUT",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
            body: JSON.stringify(user),
        });
        setSelectedUser('');
        setIsProfilesOpen();
        useStore.getState().actions.fetchUsers();

    }
    return (
        <div>
            {isProfilesOpen && (
                <div id="myModal" className={classes.modal}>
                    <div className={classes.modalcontent}>
                        <span className={classes.close} id="adduserclose" onClick={setIsProfilesOpen}>
                            &times;
                        </span>
                        <form id="addUserForm">
                            <h1 className={classes.title} id="modalTitle">
                                {selectedUser.name}
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
                                        readOnly={selectedUser.active ? undefined : "readOnly"}
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
                                        readOnly={selectedUser.active ? undefined : "readOnly"}
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
                                        readOnly={selectedUser.active ? undefined : "readOnly"}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        className={classes.formfield}
                                        type="text"
                                        id="usernameModal"
                                        name="username"
                                        value={selectedUser.username}
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
                                        readOnly={selectedUser.active ? undefined : "readOnly"}
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
                                        readOnly={selectedUser.active ? undefined : "readOnly"}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="role">Role</label>
                                    <select className={classes.roles}
                                        id="roleModal"
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        disabled={!selectedUser.active}
                                        
                                    >
                                        <option value="developer">Developer</option>
                                        <option value="ScrumMaster">Scrum Master</option>
                                        <option value="Owner">Product Owner</option>
                                    </select>
                                </div>
                                <div className={classes.buttonsdiv}>
                                    {selectedUser.active?<button onClick={(e) => {e.preventDefault(); handleUpdateUser(); }} type="submit" id="updateUser" value="Submit"  >
                                        Save
                                    </button>: <RestoreButton handleRestore={handleRestore} />}
                                    <DeleteButton handleDelete={handleDelete} />
                                   
                                </div>
                            </div>
                        </form>
                        <img className={classes.userPic} id="userPicturePreview" src={userPicture} alt="" />
                        {loggedRole === 'Owner'?  <DeleteAllTasksButton /> : null}
                    </div>
                </div>
            )}
        </div>
            );
        }

export default UserProfiles;