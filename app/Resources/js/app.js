import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    ReactDOM.render(
        <AppContainer store={store}/>,
        MOUNT_NODE
    );
};

render();