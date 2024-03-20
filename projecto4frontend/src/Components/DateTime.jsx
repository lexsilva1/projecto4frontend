import React, { useState, useEffect } from 'react';
import classes from './DateTime.module.css';

const DateTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the current time every second
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once on component mount

    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric'};
        return date.toLocaleTimeString('en-US', options);
    };

    return (
        <div className={classes.container_clock}>
            <div className={classes.display_date}>
                <span id="day">{formatDate(currentTime)}</span>
            </div>
            <div className={classes.display_time}>
                <span id="time">{formatTime(currentTime)}</span>
            </div>
        </div>
    );
};

export default DateTime;
