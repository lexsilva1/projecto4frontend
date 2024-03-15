import classes from './CategoriesTable.module.css';
import useCategoriesStore from '../../stores/CategoriesStore';
import darkCross from '../../multimedia/dark-cross-01.png';
import { useEffect, useState } from 'react';



const CategoriesTable = () => {
   const categories = useCategoriesStore(state => state.categories);
    useEffect(() => {
        useCategoriesStore.getState().actions.fetchCategories();
    }
    , []);



const setIsCategoriesOpen = useCategoriesStore(state => state.setCategoriesOpen);

const handleDelete = async (category) => {
    const response = await fetch(`http://localhost:8080/projecto4backend/rest/task/deleteCategory/${category}`, {
        method: "DELETE",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        },
    });
}

    return (
        <div>
        <h2 className={classes.title}>Categories</h2>
        <div className={classes.panel}>
         <table className={classes.table}>
            <thead>
                <tr>
                    <th className={classes.header}>Name</th>
                    <th className={classes.header}>Delete</th>
                    
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td className={classes.items}>{category.name}</td>
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