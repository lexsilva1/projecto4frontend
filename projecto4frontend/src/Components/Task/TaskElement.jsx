import React from 'react';
import classes from './TaskElement.module.css'; // Importing module classes

const TaskElement = ({ task, onDeleteTask, onDoubleClick }) => {
  const priorityClass =
    task.priority === 100
      ? classes.low
      : task.priority === 200
      ? classes.medium
      : task.priority === 300
      ? classes.high
      : '';

  return (
    <div
      className={`${classes.task} ${priorityClass}`} // Using module classes
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
        {sessionStorage.getItem('role') !== null &&
          sessionStorage.getItem('role') !== 'developer' && (
            <img
              src="multimedia/dark-cross-01.png"
              className={classes.apagarButton}
              id="delete-button99"
              onClick={() => onDeleteTask(task.id)}
            />
          )}
      </div>
    </div>
  );
};

export default TaskElement;

