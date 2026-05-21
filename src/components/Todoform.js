import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const Todoform = ({ addTodo }) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    addTodo(input);
    setInput('');
  };

  return React.createElement('form', { className: 'Todo-form', onSubmit: handleSubmit },
    React.createElement('input', {
      type: 'text',
      className: 'Todo-input',
      placeholder: 'What is the task today?',
      value: input,
      onChange: (e) => setInput(e.target.value)
    }),
    React.createElement('button', { type: 'submit', className: 'todo-button' },
      React.createElement(FontAwesomeIcon, { icon: faPlusCircle }),
      ' Add Task'
    )
  );
};

export default Todoform;