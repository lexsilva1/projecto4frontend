import React from 'react';
import classes from './TaskElement.module.css'; 
import darkCross from '../../multimedia/dark-cross-01.png'; // Importing image from the relative path
import restore from '../../multimedia/restore.png'
import useTaskStore from '../../stores/TaskStore';
import { useNavigate } from 'react-router-dom';



const TaskElement = ({ task }) => {
  const role = sessionStorage.getItem('role');
  const fetchDeletedTasks = useTaskStore(state => state.fetchDeletedTasks);
  const fetchActiveTasks = useTaskStore(state => state.fetchActiveTasks);
  const onDeleteTask = useTaskStore(state => state.onDeleteTask);
  const onRestoreTask = useTaskStore(state => state.onRestoreTask);
  const tasks = useTaskStore(state => state.tasks);
  const setTasks = useTaskStore(state => state.setTasks);
  const onUpdateStatus = useTaskStore(state => state.onUpdateStatus);
  const setEditedTaskId = useTaskStore(state => state.setEditedTaskId);
  const editedTask = useTaskStore(state => state.editedTask);
  const setEditedTask = useTaskStore(state => state.setEditedTask);
  const taskCreator = useTaskStore(state => state.taskCreator);
  const setTaskCreator = useTaskStore(state => state.setTaskCreator);
  const fetchTaskCreator = useTaskStore(state => state.fetchTaskCreator);

  const handleDelete = async (id) => {
    await onDeleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
    await fetchActiveTasks();
  }
  const handleRestore = async (id) => {
    await onRestoreTask(id);
    setTasks(tasks.filter(task => task.id !== id));
    await fetchDeletedTasks(); 
  }
  const navigate = useNavigate();
  const onDoubleClick = async (id) =>{
  navigate(`/task/${id}`)
  };

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
      draggable = {task.active ? true : null}
      category={task.category}
      id={task.id}
      priority={task.priority}
      onDoubleClick={() => onDoubleClick(task.id)}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
      }
      }
    >
      <div className={classes.postIt}>
        <h3>{task.title}</h3>
        <div className={classes.postItText}>
          <h5 style={{ marginLeft: '10px', marginTop: '-2px' }}>
            Categoria: {task.category}
          </h5>
          <p>{task.description}</p>
        </div>
        {role === 'Owner' || (role === 'ScrumMaster' && task.active) ? (
          <img
            src={darkCross}
            className={classes.apagarButton}
            id="delete-button99"
            onClick={() => handleDelete(task.id)}
          />
        ) : null}

        {role !== null &&
          task.active === false && (
            <img
              src={restore}
              className={classes.restoreButton}
              id="restore-button99"
              onClick={() => handleRestore(task.id)}
            />
          )}
      </div>
    </div>
  );
};

export default TaskElement;

