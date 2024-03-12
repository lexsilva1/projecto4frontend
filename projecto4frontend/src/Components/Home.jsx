import Header from "./HomeHeader";
import Panels from "./Panels";
import TaskCreator from "./TaskCreator";
import EditMyProfileModal from "./EditMyProfileModal";
import { useState } from 'react';

const Home = () => {

    const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
    function handleEditProfileIsOpen() {
        setEditProfileIsOpen(!editProfileIsOpen);
    
    }
    const [updatedPhoto, setUpdatedPhoto] = useState('');
    const [updatedName, setUpdatedName] = useState('');

    const handleUpdateUser = (photo, name) => {
        setUpdatedPhoto(photo);
        setUpdatedName(name);
    }

    return (
        <div>
            <Header handleEditProfileIsOpen= {handleEditProfileIsOpen} updatedPhoto={updatedPhoto} updatedName={updatedName} />
            <TaskCreator />
            <main>
                <Panels />
            </main>
            <EditMyProfileModal EditProfileIsOpen={editProfileIsOpen} handleEditProfileIsOpen={handleEditProfileIsOpen} onUpdatedInfo = {handleUpdateUser} />
            </div>
    );
}

export default Home;