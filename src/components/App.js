import logo from '../logo.svg';
import '../App.css';
import todoStore from '../stores/TodoStore';
import React, {Component} from 'react';
import todoActions from '../actions/TodoActions';

function TodoFilters (props) {
    return (
        <div>
            <span> {props.itemNumber} items left </span>
            <button onClick={ () => {todoActions.setFilter(null)} }>All</button>
            <button onClick={ () => {todoActions.setFilter('Active')} }>Active</button>
            <button onClick={ () => {todoActions.setFilter('Completed')} }>Completed</button>
        </div>
    )
}


class TodoInput extends Component{
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        if (e.keyCode !== 13) { return; }

        e.preventDefault();
        todoActions.createTodo(e.target.value);
        e.target.value = "";
    }

    handleToggle(e) {
        let checked = e.target.checked;
        todoActions.toggleAll(checked);
    }

    render() {
        return (
            <div>
                <input type="checkbox" onChange={this.handleToggle} />
                <input type="text" onKeyDown={this.handleKeyDown} />
            </div>
        )
    }
}

function Todo (props) {
    debugger;
    let item = props.item;
    function handleChange(new_properties) {
        let newItem = Object.assign(item, new_properties);
        todoActions.update(newItem);
    }

    return (
        <div>
            <input type="checkbox" name={props.id} checked={props.checked}
                   onChange={() => { handleChange({completed: !item.completed}); }}/> {props.text}
            <button onClick={() => {todoActions.delete(props.id)}}> x </button>
        </div>
    );
}


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
        if (todos.length) {
            list_items = todos.map(this.renderTodoItem);
            filter_box = <TodoFilters setFilter={this.setFilter} itemNumber={this.state.todos.length}/>
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


class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoList/>
            </div>
        );
    }
}

export default App;


