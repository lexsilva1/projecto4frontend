import { useState } from 'react';
import classes from './EditMyProfileModal.module.css';


const EditMyProfileModal = ({EditProfileIsOpen,handleEditProfileIsOpen}) => {
    return (
        <div>
            {EditProfileIsOpen && (
            <div id="myModal" className={classes.modal}>
                <div className={classes.modalcontent}>
                    <span className={classes.close} id="adduserclose" onClick={handleEditProfileIsOpen}>&times;</span>         
                    <form id="addUserForm">
                    <h1 id="modalTitle">My Profile</h1>
                        <div className="form-fields">
                            <div className={classes.formfields}>
                                <label htmlFor="firstName">First Name:</label>
                                <input type="text" id="firstNameModal" name="firstName" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" id="lastNameModal" name="lastName" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="emailModal" name="email" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="usernameModal" name="username" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="contact">Contact:</label>
                                <input type="text" id="contactModal" name="contact" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="userPicture">User Picture:</label>
                                <input type="text" id="userPictureModal" name="userPicture" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="role">Role</label>
                                <select id="role" name="role"></select>
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="passwordModal" name="password" />
                            </div>
                            <div className={classes.formfields}>
                                <label htmlFor="rePassword">Re-Write Password:</label>
                                <input type="password" id="rePasswordModal" name="rePassword" />
                            </div>
                            <div className={classes.formfields}>
                                <button type="submit" id="newUser" value="Submit">Save</button>
                            </div>
                        </div>
                    </form>
                    <img className={classes.userPic} id="userPicturePreview" src="" alt="" />
                </div>
            </div>
            )}
        </div>
    );
};

export default EditMyProfileModal;

