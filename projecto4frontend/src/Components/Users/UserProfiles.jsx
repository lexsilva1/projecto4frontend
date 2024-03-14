import classes from './UserProfiles.module.css';

const UserProfiles = () => {

    
    return (
                <div id="myModalView" className={classes.modal}>
                <div className={classes.modalcontent}>
                    <span className={classes.close}>&times;</span>
                    <h2 id ='nome' className={classes.title}></h2>
                    <div className={classes.formfields} id="modal-info">
                        <div className={classes.formfield}>
                        <label for="firstNameViewUser">First Name:</label>
                        <input type="text" id="firstNameViewUser" name="firstName" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="lastNameViewUser">Last Name:</label>
                        <input type="text" id="lastNameViewUser" name="lastName" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="usernameViewUser">Username:</label>
                        <input type="text" id="usernameViewUser" name="username" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="emailViewUser">Email:</label>
                        <input type="text" id="emailViewUser" name="email" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="contactViewUser">Contact:</label>
                        <input type="text" id="contactViewUser" name="contact" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="imageURLViewUser">User Picture:</label>
                        <input type="text" id="imageURLViewUser" name="imageURL" placeholder="" />
                        </div>
                        <div className={classes.formfield}>
                        <label for="roleViewUser">Role:</label>
                        <select id="roleViewUser" name="role">
                            <option value="developer">Developer</option>
                            <option value="ScrumMaster">Scrum Master</option>
                            <option value="Owner">Product Owner</option>
                        </select>
                       </div>
                    </div>
                    <div className= {classes.userPic}>
                        <img id="userPhotoViewUser" src="" alt="User Photo" />
                    </div>
                </div>
            </div>
            );
        }

export default UserProfiles;