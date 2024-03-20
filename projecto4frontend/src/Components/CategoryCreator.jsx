import React, { useState } from 'react';
import classes from './CategoryCreator.module.css';
import useCategoriesStore from '../stores/CategoriesStore';
import { useEffect } from 'react';



const CategoryCreator = () => {

const [category, setcategory] = useState('');
const [category2, setcategory2] = useState('');
const [category2id, setcategory2id] = useState('');
const categories = useCategoriesStore(state => state.categories);
const setCategories = useCategoriesStore(state => state.setCategories);
useEffect(() => {
useCategoriesStore.getState().actions.fetchCategories();
}, [categories]);

async function addCategory () {
    console.log(category);
    const newCategory = {

        name: category,
    }
console.log(newCategory);

const response = await fetch ("http://localhost:8080/projecto4backend/rest/task/createCategory"

    , {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(newCategory),
    });
    if(response.status === 201){
        console.log("Category added");
    }
}
async function updateCategory () {
    console.log(category2);
    const newCategory = {
        name: category2,
        id: category2id,
    }
console.log(newCategory);
const response = await fetch ("http://localhost:8080/projecto4backend/rest/task/updateCategory"

    , {
        method: "PUT",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(newCategory),
    });
    if(response.status === 200){
        console.log("Category updated");
    }
}


function handleAddCategory(e) {
    e.preventDefault();
    addCategory(category);
    setcategory('');
    useCategoriesStore.getState().actions.fetchCategories();
    
}
function handleEdition (e) {
    e.preventDefault();
    updateCategory(category2);
    setcategory2('');
    useCategoriesStore.getState().actions.fetchCategories();
    
}
return (

<aside className={classes.asideOpen}>
    
        <div>
            <label className={classes.title} htmlFor='category'>Add Category</label>
            <input className={classes.input} type='text' id='category' placeholder='category'value={category} onChange={(e)=> setcategory(e.target.value)}/>
            <button className={classes.button} type='submit' onClick={handleAddCategory}>Add</button>
        </div>
    
    
    <div className={classes.editdiv} >
        
            <label className= {classes.title} htmlFor='description'>Edit Category</label>
            <select className={classes.select} name='category' id='categoryselect' value={category2id} onChange={(e)=> setcategory2id(e.target.value)}>
                <option value=''>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <input className={classes.input} type='text' id='editcategory' placeholder='edit category'value={category2} onChange={(e)=> setcategory2(e.target.value)}/>
            <button className={classes.button} type='submit' onClick={handleEdition}>Save</button>
                </div>
</aside>
    );
};
export default CategoryCreator;
