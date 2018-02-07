import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';
import './assets/iconfont.css';
import './assets/google.css';
var  tapPlugin=require('react-tap-event-plugin');
tapPlugin();
ReactDOM.render(<App/>, document.getElementById('root'));

