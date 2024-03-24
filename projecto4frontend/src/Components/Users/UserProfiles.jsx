import classes from './UserProfiles.module.css';
import useStore from "../../stores/Userstore";
import { useState } from 'react';
import DeleteButton from '../Buttons/DeleteButton'; 
import RestoreButton from '../Buttons/RestoreButton';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import DeleteAllTasksButton from '../Buttons/DeleteAllTasksButton';
import Warning from '../Toasts/Warning';
import Success from '../Toasts/Success';
import Error from '../Toasts/Error';




const UserProfiles = () => {
    const loggedRole = sessionStorage.getItem('role');
    const isProfilesOpen = useStore(state => state.isProfilesOpen);
    const setIsProfilesOpen = useStore(state => state.setIsProfilesOpen);

    const selectedUser = useStore(state => state.selectedUser);
    const setSelectedUser = useStore(state => state.setSelectedUser);
    const names= selectedUser&& selectedUser.name? selectedUser.name.split(" ") : ['',''];
    const isDeleteSelected = useStore(state => state.isDeleteSelected);
    const setIsDeleteSelected = useStore(state => state.setIsDeleteSelected);


    const [firstName, setFirstName] = useState(names[0]);
    const [lastName, setLastName] = useState(names[1]);
    const [email, setEmail] = useState(selectedUser ? selectedUser.email :'');
    const [contact, setContact] = useState(selectedUser ? selectedUser.contactNumber :'');
    const [userPicture, setUserPicture] = useState(selectedUser ? selectedUser.userPhoto :'');
    const [role, setRole] = useState(selectedUser ? selectedUser.role :'');

    async function deleteUser(username) {

        await fetch(`http://localhost:8080/projecto4backend/rest/users/${username}`, {
            method: "DELETE",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        if(Response.status === 200){
            Success(await Response.text());
        await useStore.getState().actions.fetchDeletedUsers();
    } else if(Response.status === 403){
        Warning(await Response.text());
    }else if(Response.status === 400){
        Error(await Response.text());
    }
    }
    async function restoreUSer(username){
       const Response =  await fetch(`http://localhost:8080/projecto4backend/rest/users/active/${username}`, {
            method: "PATCH",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
        });
        if(Response.status === 200){
            
            Success(await Response.text());
        useStore.getState().actions.fetchUsers();
    }else if(Response.status === 409){
        Warning(await Response.text());
    }else if(Response.status === 401){
        Error(await Response.text());
    }
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
        const Response = await fetch("http://localhost:8080/projecto4backend/rest/users", {
            method: "PUT",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            },
            body: JSON.stringify(user),
        });
        if(Response.status === 200){
            
            Success(await Response.text());
        setSelectedUser('');
        setIsProfilesOpen();
        useStore.getState().actions.fetchUsers();

    }else{
        Error(await Response.text());
    }
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
                                        readOnly={(loggedRole !== 'Owner' || !selectedUser.active) ? "readOnly" : undefined}
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
                                        readOnly={(loggedRole !== 'Owner' || !selectedUser.active) ? "readOnly" : undefined}
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
                                        readOnly={(loggedRole !== 'Owner' || !selectedUser.active) ? "readOnly" : undefined}
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
                                        readOnly={(loggedRole !== 'Owner' || !selectedUser.active) ? "readOnly" : undefined}
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
                                        readOnly={(loggedRole !== 'Owner' || !selectedUser.active) ? "readOnly" : undefined}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="role">Role</label>
                                    <select className={classes.roles}
                                        id="roleModal"
                                        name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        disabled={(loggedRole !== 'Owner' || !selectedUser.active) ? "disabled" : undefined}
                                        
                                    >
                                        <option value="developer">Developer</option>
                                        <option value="ScrumMaster">Scrum Master</option>
                                        <option value="Owner">Product Owner</option>
                                    </select>
                                </div>
                                <div className={classes.buttonsdiv}>
                                    {loggedRole !== 'Owner' ? null : selectedUser.active?<button onClick={(e) => {e.preventDefault(); handleUpdateUser(); }} type="submit" id="updateUser" value="Submit"  >
                                        Save
                                    </button>: <RestoreButton handleRestore={handleRestore} />}
                                    {loggedRole=== 'Owner' && <DeleteButton handleDelete={handleDelete} />}
                                </div>
                            </div>
                        </form>
                        <img className={classes.userPic} id="userPicturePreview" src={userPicture} alt="" />
                        {loggedRole === 'Owner' &&  <DeleteAllTasksButton /> }
                    </div>
                </div>
            )}
        </div>
            );
        }

export default UserProfiles;