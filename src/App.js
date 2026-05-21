import React from 'react';
import Todowrapper from './components/Todowrapper';
import './App.css';

const App = () => {
  return React.createElement('div', { className: 'app-container' },
    React.createElement(Todowrapper, null)
  );
};

export default App;