import React, { useState } from 'react';
import classes from './UserCreator.module.css';
import useCategoriesStore from '../stores/CategoriesStore';
import FilterCategories from './Buttons/FilterCategories';



const CategoryCreator = () => {

    const [category, setcategory] = useState('');

async function addCategory (category) {

    const response = await fetch ("http://localhost:8080/projecto4backend/rest/task/createCategory"

    , {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({category}),
    });
    if(response.status === 200){
        console.log("Category added");
    }
}

function handleAddCategory(e) {
    e.preventDefault();
    
}
function handleEdition () {
    console.log("Edition");
}
return (

<aside  className={classes.asideOpen}>
    <h2>New User</h2>
    <form>
        <div>
            <label className={classes.title} htmlFor='username'>Add Category</label>
            <input className={classes.input} type='text' id='category' placeholder='category' onChange={(e)=> setcategory(e.target.value)}/>
            <button className={classes.button} type='submit' onClick={handleAddCategory}>Add</button>
        </div>
    </form>
        <div>
            <label className= {classes.title} htmlFor='description'>Edit Category</label>
            
            <input className={classes.input} type='text' id='category' placeholder='category' onChange={(e)=> setcategory(e.target.value)}/>
        </div>
        <form>
        <FilterCategories />
    
        <button className={classes.button} type='submit' onClick={handleEdition}>Register</button>
        </form>
    </aside>
    );
};

export default CategoryCreator;