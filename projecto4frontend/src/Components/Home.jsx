import Header from "./HomeHeader";
import Panels from "./Panels";
import TaskCreator from "./TaskCreator";
import EditMyProfileModal from "./EditMyProfileModal";
import UsersButton from "./Buttons/UsersButton";
import { useEffect, useState } from 'react';
import DeletedButton from "./Buttons/DeletedButton";
import Footer from "./Footer";
import FilterCategories from "./Buttons/FilterCategories";
import FilterUsers from "./Buttons/FilterUsers";
import CategoriesButton from "./Buttons/CategoriesButton";
import useStore from "../stores/Userstore";
import UserProfiles from "./Users/UserProfiles";
import UserCreator from "./UserCreator";

const Home = () => {
    const role = sessionStorage.getItem("role");
   
    const [editProfileIsOpen, setEditProfileIsOpen] = useState(false);
    function handleEditProfileIsOpen() {
        setEditProfileIsOpen(!editProfileIsOpen);
    
    }
    const [updatedPhoto, setUpdatedPhoto] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const selected = useStore(state => state.selected);
    const users = useStore(state => state.users);
    

    const handleUpdateUser = (photo, name) => {
        setUpdatedPhoto(photo);
        setUpdatedName(name);
    }
    


    useEffect(() => {
        if (role === "Owner" || role === "ScrumMaster") {
            useStore.getState().actions.fetchUsers();
        }
    }, []);
    


    return (
        <div>
            <Header handleEditProfileIsOpen={handleEditProfileIsOpen} updatedPhoto={updatedPhoto} updatedName={updatedName} />
            {selected ? <UserCreator /> :<TaskCreator />}
            <main>
                <FilterCategories />
                <FilterUsers />
                <DeletedButton />
                <UsersButton />
                <CategoriesButton />
                <Panels  users={users}/>
            </main>
            <Footer />
            <EditMyProfileModal EditProfileIsOpen={editProfileIsOpen} handleEditProfileIsOpen={handleEditProfileIsOpen} onUpdatedInfo={handleUpdateUser} />
           
        </div>
    );
}

export default Home;