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
import userElement from './Users/UserElement';

const Home = () => {
    const [users, setUsers] = useState([]);
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
    const [selected, setSelected] = useState(false);

    function handleSelected() {
        setSelected(!selected);
    }
    async function handleButtonClick() {
        if (selected) {
           await allUsers();
        } else {
            clearPanels();
        }
    }
    
    
    function clearPanels() {
        const userElements = document.querySelectorAll('.user');
        userElements.forEach((element) => {
            element.remove();
        });
    }
    useEffect(() => {
        async function allUsers() {
        const response = await fetch("http://localhost:8080/projecto4backend/rest/user/all", {
            method: "GET",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                token: sessionStorage.getItem("token"),
            }
        });
        if(response.status === 200){
        const data= await response.json();
        setUsers(data);
        console.log(data);
    }else{
        console.log('error');
    }
    }
    allUsers();
    }, []);
    


    return (
        <div>
            <Header handleEditProfileIsOpen={handleEditProfileIsOpen} updatedPhoto={updatedPhoto} updatedName={updatedName} />
            <TaskCreator />
            <main>
                <FilterCategories />
                <FilterUsers />
                <DeletedButton />
                <UsersButton handleSelected={handleSelected} selected={selected} handleButtonClick={handleButtonClick()}/>
                <Panels selected={selected} users={users}/>
            </main>
            <Footer />
            <EditMyProfileModal EditProfileIsOpen={editProfileIsOpen} handleEditProfileIsOpen={handleEditProfileIsOpen} onUpdatedInfo={handleUpdateUser} />
        </div>
    );
}

export default Home;