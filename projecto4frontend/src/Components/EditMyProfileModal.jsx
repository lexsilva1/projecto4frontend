import { useState } from 'react';
import classes from './MyProfile.module.css';

const MyProfile = () => {
    return (
        <div>
            <div id="myModal" className={classes.modal}>
                <div className={classes.modal-content}>
                    <h1 id="modalTitle">Add User</h1>
                    <span className={classes.close} id="adduserclose">&times;</span>
                    <form id="addUserForm">
                        <div className="form-fields">
                            <div className={classes.form-fields}>
                                <label htmlFor="firstName">First Name:</label>
                                <input type="text" id="firstNameModal" name="firstName" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" id="lastNameModal" name="lastName" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="emailModal" name="email" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="usernameModal" name="username" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="contact">Contact:</label>
                                <input type="text" id="contactModal" name="contact" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="userPicture">User Picture:</label>
                                <input type="text" id="userPictureModal" name="userPicture" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="role">Role</label>
                                <select id="role" name="role"></select>
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="passwordModal" name="password" />
                            </div>
                            <div className={classes.form-field}>
                                <label htmlFor="rePassword">Re-Write Password:</label>
                                <input type="password" id="rePasswordModal" name="rePassword" />
                            </div>
                            <div className={classes.form-field}>
                                <input type="submit" id="newUser" value="Submit" />
                            </div>
                        </div>
                        <label htmlFor="userPicturePreview">User Picture</label>
                        <img id="userPicturePreview" src="" alt="" />
                    </form>
                </div>
            </div>
            <li className={classes.link-bc} id="backButton"><a href="home.html">Home</a></li>
        </div>
    );
}
