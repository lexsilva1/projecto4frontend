import React, { useEffect } from 'react';
import classes from './CategoriesTable.module.css';
import useCategoriesStore from '../../stores/CategoriesStore';
import darkCross from '../../multimedia/dark-cross-01.png';



const CategoriesTable = () => {
    useEffect(() => {
        useCategoriesStore.getState().actions.fetchCategories();
    }
    , []);


const categories = useCategoriesStore(state => state.categories);
const setIsCategoriesOpen = useCategoriesStore(state => state.setCategoriesOpen);

    return (
        <div>
        <h2 className={classes.title}>Categories</h2>
        <div className={classes.panel}>
         <table className={classes.table}>
            <thead>
                <tr>
                    <th className={classes.header}>Name</th>
                    <th className={classes.header}>Edit</th>
                    <th className={classes.header}>Delete</th>
                    
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td><button className={classes.apagarButton}>📝</button></td> 
                        <td><button className={classes.apagarButton} onClick={() => handleDelete(category.name)}>🗑️</button></td>

                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
        
    );
};

export default CategoriesTable;