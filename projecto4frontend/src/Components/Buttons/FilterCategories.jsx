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
const onFilterByCategory = useTaskStore(state => state.onFilterByCategory);



const handleChange = async (category) => {
    if(category === ""){
        await fetchActiveTasks();
    }
    await onFilterByCategory(category);
}






    return (
        <div className={classes.filtercontainer}>
            <label className={classes.filter} htmlFor="filter">Filter by category:</label>
            <select onChange={(e) => handleChange(e.target.value)}  className={classes.filter} id="filter" >
                <option value="">All</option>
                {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select>
        </div>
    );
}

export default FilterCategories;