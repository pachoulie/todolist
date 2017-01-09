import React from 'react';
import TodoListContainer from '../containers/TodoListContainer';
import AddTodo from './AddTodo';

class App extends React.PureComponent {
    render() {
        return (
            <div>
                <h1>Todo list</h1>
                <TodoListContainer />
            </div>
        );
    }
}

export default App;
