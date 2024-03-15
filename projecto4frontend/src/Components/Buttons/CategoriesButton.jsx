import classes from './CategoriesButton.module.css';
import React from 'react';
import { useState } from 'react';
import useCategoriesStore from '../../stores/CategoriesStore';

const CategoriesButton = () => {
    const setcategoriesisOpen = useCategoriesStore(state => state.setCategoriesOpen);

    const handleCategoriesIsOpen = () => {
        setcategoriesisOpen();
        console.log(useCategoriesStore.getState());
    }
    return (
        <button onClick={handleCategoriesIsOpen} className={classes.button}>Categories</button>
    );
}

export default CategoriesButton;
