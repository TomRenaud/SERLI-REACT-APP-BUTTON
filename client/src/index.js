import 'es6-shim'; // yeah, polyfill all the things !!!
import 'whatwg-fetch'; // yeah, polyfill all the things !!!
import Symbol from 'es-symbol';
import React from 'react';
import ReactDOM from 'react-dom';
import { SerliButtonApp } from './components';
import './index.css';

if (!window.Symbol) {
  window.Symbol = Symbol; // yeah, polyfill all the things !!!
}

ReactDOM.render(<SerliButtonApp />, document.getElementById('root'));
