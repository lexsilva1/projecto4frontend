import classes from './UserProfiles.module.css';
import useStore from "../../stores/Userstore";
const UserProfiles = () => {

    const isProfilesOpen = useStore(state => state.isProfilesOpen);
    const setIsProfilesOpen = useStore(state => state.setIsProfilesOpen);

    const selectedUser = useStore(state => state.selectedUser);
    const names= selectedUser.name.split(" ");
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
                                        value={names[0]}
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
                                        value={names[1]}
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
                                        value={selectedUser.email}
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
                                        value={selectedUser.contactNumber}
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
                                        value={selectedUser.userPhoto}
                                        onChange={(e) => setUserPicture(e.target.value)}
                                    />
                                </div>
                                <div className={classes.formfields}>
                                    <label htmlFor="role">Role</label>
                                    <select
                                        id="roleModal"
                                        name="role"
                                        value={selectedUser.role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="developer">Developer</option>
                                        <option value="ScrumMaster">Scrum Master</option>
                                        <option value="Owner">Product Owner</option>
                                    </select>
                                </div>
                                <div className={classes.formfields}>
                                    <button onClick={(e) => {e.preventDefault(); handleUpdateUser(); }} type="submit" id="updateUser" value="Submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        <img className={classes.userPic} id="userPicturePreview" src={selectedUser.userPhoto} alt="" />
                    </div>
                </div>
            )}
        </div>
            );
        }

export default UserProfiles;