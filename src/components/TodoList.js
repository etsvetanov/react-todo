import React, {Component} from 'react';
import todoStore from '../stores/TodoStore';
import Todo from './Todo';
import TodoFilters from './TodoFilters';
import TodoInput from './TodoInput';


class TodoList extends Component {
    constructor(props) {
        super(props);
        console.log('TodoList constructor called');
        this.renderTodoItem = this.renderTodoItem.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            todos: todoStore.getAll(),
            filter: this.filterAll,
            allChecked: false,
            count: todoStore.getCount(),
        }
    }

    componentWillMount() {
        todoStore.on('change', this.onChange);

    }

    componentWillUnmount() {
        todoStore.removeChangeListener(this.onChange)
    }

    onChange() {
        this.setState({todos: todoStore.getAll()});
        this.setState({count: todoStore.getCount()});
    }


    renderTodoItem (item) {

        return (
            <Todo name={item.id} checked={item.completed} text={item.text}
                  key={item.id} id={item.id} />
        )
    }

    render() {
        let list_items = null;
        let filter_box = null;

        let todos = this.state.todos;
        if (this.state.count) {
            list_items = todos.map(this.renderTodoItem);
            filter_box = <TodoFilters setFilter={this.setFilter} itemNumber={this.state.count}/>
        }

        return (
            <div>
                <TodoInput checked={this.state.allChecked} />
                {list_items}
                {filter_box}
            </div>
        );
    }
}

export default TodoList;