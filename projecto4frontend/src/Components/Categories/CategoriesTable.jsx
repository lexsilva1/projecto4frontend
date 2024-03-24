import classes from './CategoriesTable.module.css';
import useCategoriesStore from '../../stores/CategoriesStore';
import darkCross from '../../multimedia/dark-cross-01.png';
import { useEffect, useState } from 'react';
import Success from '../Toasts/Success';
import Warning from '../Toasts/Warning';
import Error from '../Toasts/Error';



const CategoriesTable = () => {
   const categories = useCategoriesStore(state => state.categories);
   const setCategories = useCategoriesStore(state => state.setCategories);



const setIsCategoriesOpen = useCategoriesStore(state => state.setCategoriesOpen);

const handleDelete = async (category) => {
    const response = await fetch(`http://localhost:8080/projecto4backend/rest/tasks/Categories/${category}`, {
        method: "DELETE",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token: sessionStorage.getItem("token"),
        }
    });
    if (response.status === 200) {
        Success(await response.text());
        setCategories(useCategoriesStore.getState().actions.fetchCategories());
    }else if(response.status === 409){
        Warning(await response.text());
    }else if(response.status === 401){
        Error(await response.text());
    }
}

    return (
        <div data-testid='CategoriesTable'>
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