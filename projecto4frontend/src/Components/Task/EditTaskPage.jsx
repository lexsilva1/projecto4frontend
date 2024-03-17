import classes from './EditTaskPage.module.css';
import Header from '../HomeHeader';
import Footer from '../Footer';
import EditTaskMain from './EditTaskMain';
import React from 'react';


const EditTaskPage = () => {
    return (
        <div className={classes.home}>
            <Header />
            <EditTaskMain />
            <Footer />
        </div>
    );
}
export default EditTaskPage;