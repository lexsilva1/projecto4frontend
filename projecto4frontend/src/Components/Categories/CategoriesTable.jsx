import React, { useEffect } from 'react';
import classes from './CategoriesTable.module.css';
import useCategoriesStore from '../../stores/CategoriesStore';



const CategoriesTable = () => {
    useEffect(() => {
        useCategoriesStore.getState().actions.fetchCategories();
    }
    , []);


const categories = useCategoriesStore(state => state.categories);
const setIsCategoriesOpen = useCategoriesStore(state => state.setCategoriesOpen);

    return (
        <div className={classes.modal}>
            <div className={classes.modalcontent}>
            <span className={classes.close} id='categoriesclose' onClick={setIsCategoriesOpen}> &times;
                        </span>
            <h2>Categories</h2>
        <table className={classes.table}>
            <thead>
                <tr>
                    <th className={classes.header}>ID</th>
                    <th className={classes.header}>Name</th>
                    
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
};

export default CategoriesTable;