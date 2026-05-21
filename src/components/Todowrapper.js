import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Todoform from './Todoform';
import Todo from './Todo';

const Todowrapper = () => {
  const [tasks, setTasks] = React.useState([
    { id: 't1', text: 'Explain why jordan is the goat', completed: false, timerSeconds: 0, timerRunning: false },
    { id: 't2', text: 'Drink milk', completed: false, timerSeconds: 0, timerRunning: false },
    { id: 't3', text: 'Buy bread', completed: false, timerSeconds: 0, timerRunning: false },
    { id: 't4', text: 'Go shopping', completed: false, timerSeconds: 0, timerRunning: false }
  ]);

  const intervalsRef = React.useRef(new Map());

  const clearTaskInterval = (taskId) => {
    const intervalId = intervalsRef.current.get(taskId);
    if (intervalId) {
      clearInterval(intervalId);
      intervalsRef.current.delete(taskId);
    }
  };

  const stopTimer = (id) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id && task.timerRunning) {
          clearTaskInterval(id);
          return { ...task, timerRunning: false };
        }
        return task;
      })
    );
  };

  const startTimer = (id) => {
    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      if (!target || target.timerRunning || target.completed) return prev;

      clearTaskInterval(id);
      const intervalId = setInterval(() => {
        setTasks(current =>
          current.map(task =>
            task.id === id && task.timerRunning === true
              ? { ...task, timerSeconds: task.timerSeconds + 1 }
              : task
          )
        );
      }, 1000);
      intervalsRef.current.set(id, intervalId);

      return prev.map(task =>
        task.id === id ? { ...task, timerRunning: true } : task
      );
    });
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete || !taskToDelete.completed) return;
    clearTaskInterval(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          if (newCompleted && task.timerRunning) {
            clearTaskInterval(id);
            return { ...task, completed: newCompleted, timerRunning: false };
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      })
    );
  };

  const EditTodo = (id, newText) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, text: newText } : task)
    );
  };

  const addTodo = (text) => {
    const newTask = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      text: text,
      completed: false,
      timerSeconds: 0,
      timerRunning: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  React.useEffect(() => {
    return () => {
      for (const [_, intervalId] of intervalsRef.current.entries()) {
        clearInterval(intervalId);
      }
      intervalsRef.current.clear();
    };
  }, []);

  const taskElements = tasks.map(task =>
    React.createElement(Todo, {
      key: task.id,
      task: task,
      toggleComplete: toggleComplete,
      deleteTask: deleteTask,
      editTodo: EditTodo,
      startTimer: startTimer,
      stopTimer: stopTimer
    })
  );

  const emptyMessage = tasks.length === 0 && React.createElement('div', { className: 'empty-msg' },
    React.createElement(FontAwesomeIcon, { icon: faCheckCircle }),
    'No tasks yet. Add a new goal with timer!'
  );

  return React.createElement('div', { className: 'todo-wrapper' },
    React.createElement('h1', null,
      React.createElement(FontAwesomeIcon, { icon: faTasks }),
      ' Get Things Done!'
    ),
    React.createElement(Todoform, { addTodo: addTodo }),
    React.createElement('div', { className: 'tasks-list' }, taskElements.length ? taskElements : emptyMessage)
  );
};

export default Todowrapper;