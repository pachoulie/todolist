import React from 'react';
import ReactDOM from 'react-dom';
import Component from './components/component';

const MOUNT_NODE = document.getElementById('app');

let render = () => {
    ReactDOM.render(
        <Component />,
        MOUNT_NODE
    );
};

render();