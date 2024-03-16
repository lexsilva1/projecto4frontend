import React from 'react';
import classes from './TaskElement.module.css'; 
import darkCross from '../../multimedia/dark-cross-01.png'; // Importing image from the relative path
import restore from '../../multimedia/restore.png'


const TaskElement = ({ task, onDeleteTask, onDoubleClick }) => {
  const role = sessionStorage.getItem('role');
  const priorityClass =
    task.priority === 100
      ? classes.low
      : task.priority === 200
      ? classes.medium
      : task.priority === 300
      ? classes.high
      : '';

  const activeClass = !task.active ? classes.deleted : ''; 
  return (
    <div
      className={`${classes.task} ${priorityClass} ${activeClass}`} // Using module classes
      
      draggable
      category={task.category}
      id={task.id}
      priority={task.priority}
      onDoubleClick={onDoubleClick}

    >
      <div className={classes.postIt}>
        <h3>{task.title}</h3>
        <div className={classes.postItText}>
          <h5 style={{ marginLeft: '10px', marginTop: '-2px' }}>
            Categoria: {task.category}
          </h5>
          <p>{task.description}</p>
        </div>
        {role !== null &&
          role !== 'developer' && (
            <img
              src={darkCross}
              className={classes.apagarButton}
              id="delete-button99"
              onClick={() => onDeleteTask(task.id)}
            />
          )}
        {role !== null &&
          task.active === false && (
            <img
              src={restore}
              className={classes.restoreButton}
              id="restore-button99"
              onClick={() => onDeleteTask(task.id)}
            />
          )}
      </div>
    </div>
  );
};

export default TaskElement;

