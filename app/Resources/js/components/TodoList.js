import React from 'react';
import Todo from './Todo';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class TodoList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        return (
            <ul>
                {this.props.todos.map(todo =>
                    <Todo
                        key={todo.get('id')}
                        text={todo.get('text')}
                        completed={todo.get('completed')}
                        onClick={() => this.props.onTodoClick(todo.get('id'))}
                    />
                )}
            </ul>
        );
    }
}

TodoList.propTypes = {
    todos: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: React.PropTypes.number.isRequired,
            completed: React.PropTypes.bool.isRequired,
            text: React.PropTypes.string.isRequired
        })
    ).isRequired,
    onTodoClick: React.PropTypes.func.isRequired,
    fetchTasks: React.PropTypes.func.isRequired
};

export default TodoList;
