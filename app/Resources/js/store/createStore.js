import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import todolistReducer from '../modules/todolist';

export default (initialState) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        todolistReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );
    store.asyncReducers = {};

    return store;
};
