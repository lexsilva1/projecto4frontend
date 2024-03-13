import classes from './CategoriesButton.module.css';
import React from 'react';
import { useState } from 'react';

const CategoriesButton = () => {
    return (
        <button className={classes.button}>Categories</button>
    );
}

export default CategoriesButton;
