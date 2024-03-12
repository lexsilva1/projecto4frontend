import Header from "./HomeHeader";
import Panels from "./Panels";
import TaskCreator from "./TaskCreator";
import EditMyProfileModal from "./EditMyProfileModal";
import { useState } from 'react';

const Home = () => {

    const [editProfileIsOpen, setEditProfileIsOpen] = useState(true);
    function handleEditProfileIsOpen() {
        setEditProfileIsOpen(!editProfileIsOpen);
    
    }
    return (
        <div>
            <Header handleEditProfileIsOpen= {handleEditProfileIsOpen} />
            <TaskCreator />
            <main>
                <Panels />
            </main>
            <EditMyProfileModal EditProfileIsOpen={editProfileIsOpen} handleEditProfileIsOpen={handleEditProfileIsOpen} />
            </div>
    );
}

export default Home;