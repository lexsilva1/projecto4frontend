import classes from './Panels.module.css';
import React from 'react';

const Panels = () => {
    return (
        <div className={classes.container}>
            <div className={classes.panel}>
                <h2 className={classes.mainhome}>To Do</h2>
                <p>Content for panel 1</p>
            </div>
            <div className={classes.panel}>
                <h2 className={classes.mainhome}>Doing</h2>
                <p>Content for panel 2</p>
            </div>
            <div className={classes.panel}>
                <h2 className={classes.mainhome}>Done</h2>
                <p>Content for panel 3</p>
            </div>
        </div>
    );
};
export default Panels;