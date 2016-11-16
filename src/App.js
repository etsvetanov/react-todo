import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import todoActions from './actions/TodoActions';
import todoStore from './stores/TodoStore';


function ListItem (props) {
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

function ItemFilters (props) {
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
            count: todoStore.getNumber(),
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
        this.setState({count: todoStore.getNumber()});
    }


    renderTodoItem (id) {
        let item = this.state.todos[id];
        return (
            <ListItem name={id} checked={item.completed} text={item.text}
                      key={id} id={id} />
        )
    }

    render() {
        let list_items = null;
        let filter_box = null;

        let ids = Object.keys(this.state.todos);

        if (ids.length) {
            list_items = ids.map(this.renderTodoItem);
            filter_box = <ItemFilters setFilter={this.setFilter} itemNumber={this.state.count}/>
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


