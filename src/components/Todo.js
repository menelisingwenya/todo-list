import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';
import Edittodoform from './Edittodoform';

const Todo = ({ task, toggleComplete, deleteTask, editTodo, startTimer, stopTimer }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showDeleteBtn = task.completed === true;

  return React.createElement('div', { className: 'todo-item' },
    React.createElement('div', { className: 'todo-main' },
      React.createElement('div', { className: 'todo-left' },
        React.createElement('input', {
          type: 'checkbox',
          className: 'todo-check',
          checked: task.completed,
          onChange: () => toggleComplete(task.id)
        }),
        React.createElement('span', { className: `todo-text ${task.completed ? 'completed-text' : ''}` }, task.text)
      ),
      React.createElement('div', { className: 'action-buttons' },
        React.createElement('button', {
          className: 'icon-btn',
          onClick: () => setIsEditing(!isEditing),
          title: 'Edit task'
        }, React.createElement(FontAwesomeIcon, { icon: faPencilAlt })),
        showDeleteBtn && React.createElement('button', {
          className: 'icon-btn',
          onClick: () => deleteTask(task.id),
          title: 'Remove done task'
        }, React.createElement(FontAwesomeIcon, { icon: faTrashAlt }))
      )
    ),
    React.createElement('div', { className: 'timer-section' },
      React.createElement('div', { className: 'timer-display' },
        React.createElement(FontAwesomeIcon, { icon: faHourglassHalf, style: { marginRight: '6px' } }),
        formatTime(task.timerSeconds)
      ),
      React.createElement('div', { className: 'timer-actions' },
        React.createElement('button', {
          className: 'timer-btn',
          onClick: () => startTimer(task.id),
          disabled: task.timerRunning || task.completed,
          style: { opacity: (task.timerRunning || task.completed) ? 0.5 : 1 }
        }, React.createElement(FontAwesomeIcon, { icon: faPlay })),
        React.createElement('button', {
          className: 'timer-btn',
          onClick: () => stopTimer(task.id),
          disabled: !task.timerRunning,
          style: { opacity: !task.timerRunning ? 0.5 : 1 }
        }, React.createElement(FontAwesomeIcon, { icon: faStop }))
      )
    ),
    isEditing && React.createElement(Edittodoform, { task, editTodo, setEditing: setIsEditing })
  );
};

export default Todo;
