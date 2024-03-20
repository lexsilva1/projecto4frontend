import classes from './FilterCategories.module.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import useTaskStore from '../../stores/TaskStore';
import useCategoriesStore from '../../stores/CategoriesStore';


const FilterCategories = () => {
    const fetchCategories = useCategoriesStore(state => state.fetchCategories);
    const categories = useCategoriesStore(state => state.categories);



const [selctedCategory, setSelectedCategory] = useState('');
const filterByCategory = useTaskStore(state => state.onFilterByCategory);
const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
async function handleFilter(category) {
    if(category === ""){
        fetchActiveTasks();
    }else{
        setSelectedCategory(category);
        filterByCategory(category);
    }

}


const handleChange = async (category) => {
    category === "" ? fetchActiveTasks() : handleFilter(category);
}



    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by category:</label>
            <select onChange={(e) => handleChange(e.target.value)} value={selctedCategory} className={classes.filter} id="filter" >
                <option value="">All</option>
                {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select>
        </div>
    );
}

export default FilterCategories;