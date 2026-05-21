import React from 'react';

const Edittodoform = ({ task, editTodo, setEditing }) => {
  const [value, setValue] = React.useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') return;
    editTodo(task.id, value.trim());
    setEditing(false);
  };

  return React.createElement('form', { className: 'edit-form', onSubmit: handleSubmit },
    React.createElement('input', {
      type: 'text',
      className: 'edit-input',
      value: value,
      onChange: (e) => setValue(e.target.value),
      autoFocus: true
    }),
    React.createElement('button', { type: 'submit', className: 'save-btn' }, 'Save'),
    React.createElement('button', { type: 'button', className: 'cancel-btn', onClick: () => setEditing(false) }, 'Cancel')
  );
};

export default Edittodoform;