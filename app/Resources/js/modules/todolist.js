import {List, Map} from 'immutable';
import fetch from 'isomorphic-fetch';

const ROOT_URL = 'http://127.0.0.1:8000';

// ------------------------------------
// Action types
// ------------------------------------
export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const FETCH_TASKS_SUCCESSFULLY = 'FETCH_TASKS_SUCCESSFULLY';
export const SET_TASKS = 'SET_TASKS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_FILTER = 'SET_FILTER';

export const actionTypes = {
    FETCH_TASKS,
    FETCH_TASKS_ERROR,
    FETCH_TASKS_SUCCESSFULLY,
    SET_TASKS,
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER
};

// ------------------------------------
// Other constants
// ------------------------------------
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

// ------------------------------------
// Action creators
// ------------------------------------
export function setTasks(tasks) {
    return dispatch => {
        dispatch({tasks, type: SET_TASKS});
    };
}

export let index = 0;
export function addTodo(text) {
    return {
        index: ++index,
        type: ADD_TODO,
        text
    };
}
export function toggleTodo(index) {
    return {
        type: TOGGLE_TODO,
        index
    };
}
export function setVisibilityFilter(filter) {
    return {
        type: SET_FILTER,
        filter
    };
}

export const actions = {
    setTasks,
    addTodo,
    toggleTodo,
    setVisibilityFilter
};

export function fetchTasks() {
    return dispatch =>
        fetch(`${ROOT_URL}/api/tasks.json`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(tasks => dispatch(setTasks(tasks)))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_TASKS]: (state, action) =>
        state.set('todos', action.tasks),

    [SET_FILTER]: (state, action) =>
        state.set('filter', action.filter),

    [ADD_TODO]: (state, action) =>
        state.updateIn(['todos'], (todos) => todos.push(Map({id: action.index, text: action.text, completed: false}))),

    [TOGGLE_TODO]: (state, action) => {
        const index = state.get('todos').findIndex(todo => todo.index === action.index);
        return state.updateIn(['todos', index, 'completed'], completed => !completed)
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
    filter: VisibilityFilters.SHOW_ALL,
    todos: List()
});

export default function todoListReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
