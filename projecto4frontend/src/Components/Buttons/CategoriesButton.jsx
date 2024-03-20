import classes from './CategoriesButton.module.css';
import React from 'react';
import { useState } from 'react';
import useCategoriesStore from '../../stores/CategoriesStore';
import usestore from '../../stores/Userstore';

const CategoriesButton = () => {
    const setcategoriesisOpen = useCategoriesStore(state => state.setCategoriesOpen);
    const categoriesIsOpen = useCategoriesStore(state => state.categoriesisOpen);
    const setSelected = usestore(state => state.setSelected);
    const selected = usestore(state => state.selected);
    const isDeleteselected = usestore(state => state.isDeleteSelected);
    const setIsDeleteSelected = usestore(state => state.setIsDeleteSelected);

    const handleCategoriesIsOpen = () => {
        setcategoriesisOpen();
        selected ? setSelected(false) : '';
        isDeleteselected ? setIsDeleteSelected(false) : '';
    }
    return (
        <button onClick={handleCategoriesIsOpen} className={`${classes.button} ${categoriesIsOpen? classes.selected : ""}`}>Categories</button>
    );
}

export default CategoriesButton;
