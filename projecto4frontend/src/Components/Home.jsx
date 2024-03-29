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
import useCategoriesStore from "../stores/CategoriesStore";
import CategoriesTable from "./Categories/CategoriesTable";
import CategoryCreator from "./CategoryCreator";
import useTaskStore from "../stores/TaskStore";
import classes from './Home.module.css';

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
    const tasks = useTaskStore(state => state.tasks);
    const isProfilesOpen = useStore(state => state.isProfilesOpen);
    const categoriesisOpen = useCategoriesStore(state => state.categoriesisOpen);
    const isDeleteSelected = useStore(state => state.isDeleteSelected);
    
    

    const handleUpdateUser = (photo, name) => {
        setUpdatedPhoto(photo);
        setUpdatedName(name);
    }
    


    useEffect(() => {
        if (role === "Owner" || role === "ScrumMaster") {
            useStore.getState().actions.fetchUsers();
        }
    }, []);
    useEffect(() => {
            useCategoriesStore.getState().actions.fetchCategories();
    }, []);


    return (
        <div>
            <Header handleEditProfileIsOpen={handleEditProfileIsOpen} updatedPhoto={updatedPhoto} updatedName={updatedName} />
            {categoriesisOpen?<CategoryCreator />:(selected  ? (role === 'Owner' ? <UserCreator /> : null) :<TaskCreator />)}
            <main>
                <div className={`${role === 'developer' ? classes.devfilters : classes.filters} `}>
                {(categoriesisOpen||selected || isDeleteSelected) || role=== 'developer'?null:<FilterCategories />}
                {(categoriesisOpen||selected || isDeleteSelected) || role === 'developer' ?null:<FilterUsers />}
                {categoriesisOpen ? null :(role !== 'developer' && (role==='ScrumMaster' && !selected)) || role==='Owner' ?<DeletedButton /> :null}
                {role === 'developer' ? null :<UsersButton />}
                {role === 'Owner' ? <CategoriesButton /> : null}
                </div>
               { categoriesisOpen ? <CategoriesTable />:  <Panels  users={users}/>}
            </main>
            <Footer />
            <EditMyProfileModal EditProfileIsOpen={editProfileIsOpen} handleEditProfileIsOpen={handleEditProfileIsOpen} onUpdatedInfo={handleUpdateUser} />
           {isProfilesOpen ? <UserProfiles />: null}
        </div>
    );
}

export default Home;