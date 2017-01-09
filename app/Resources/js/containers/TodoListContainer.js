import {connect} from 'react-redux';
import {actions, fetchTasks, VisibilityFilters} from '../modules/todolist';
import TodoList from '../components/TodoList';

const getTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_COMPLETED :
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE :
            return todos.filter(todo => !todo.completed);
        case VisibilityFilters.SHOW_ALL :
        default:
            return todos;
    }
};

const mapStateToProps = (state) => {
    return {
        todos: getTodos(
            state.get('todos'),
            state.get('filter')
        )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch(actions.toggleTodo(id));
        },
        fetchTasks: () => {
            dispatch(fetchTasks());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
