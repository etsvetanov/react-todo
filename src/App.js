import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoStore from './stores/TodoStore';
import * as TodoActions from './actions/TodoActions';

function ListItem (props) {
    return (
        <div>
            <input type="checkbox" name={props.id} checked={props.checked} onChange={props.onchange}/> {props.text}
            <button onClick={props.handleRemove}> x </button>
        </div>
    );
}

function ItemFilters (props) {
    return (
        <div>
            <span> {props.itemNumber} items left </span>
            <button onClick={props.setFilter}>All</button>
            <button onClick={props.setFilter}>Active</button>
            <button onClick={props.setFilter}>Completed</button>
        </div>
    )
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.counter = 10;
        this.save = this.save.bind(this);
        this.setFilter = this.setFilter.bind(this);
        // this.filterItems = this.filterItems.bind(this);
        this.makeListItem = this.makeListItem.bind(this);
        this.toggleAllChecked = this.toggleAllChecked.bind(this);

        this.filters = {
            'All': this.filterAll,
            'Active': this.filterActive,
            'Completed': this.filterCompleted
        };

        this.state = {
            todos: TodoStore.getAll(),
            filter: this.filterAll,
            allChecked: false
        }
    }

    setFilter(e) {
        this.setState({filter: this.filters[e.target.innerHTML]});
    }

    save(item) {
        item.id = this.counter++;
        this.setState(function(prevState, props) {
            return { todos: prevState.todos.concat([item])};
        })
    }

    handleItemChecked(item) {
        item.completed = !item.completed;
        this.setState({});  // hurr durr it works
    }

    removeItem(item) {
        var index = this.state.todos.indexOf(item);

        if (index > -1) {
            var arr = this.state.todos.splice(index, 1);
            this.setState({});
        }
    }

    makeListItem (item) {
        return (
            <ListItem name={item.id} checked={item.completed} text={item.text}
                      key={item.id} onchange={this.handleItemChecked.bind(this, item)}
                      handleRemove={this.removeItem.bind(this, item)}/>
        )
    }

    toggleAllChecked(e) {
        var state = e.target.checked;
        for (var i = 0; i < this.state.todos.length; i++) {
            this.state.todos[i].completed = state;
        }
        this.setState({});
    }

    filterAll(item) {
        return true;
    }

    filterActive(item) {
        return !item.completed;
    }

    filterCompleted(item) {
        return item.completed;
    }



    // filterItems (item) {
    //     if (this.state.filter == 'Active' && item.completed) {
    //         return false;
    //     }
    //
    //     if (this.state.filter == 'Completed' && !item.completed) {
    //         return false;
    //     }
    //
    //     return true;
    // }

    componentWillMount() {
        TodoStore.on('change', () => {
            this.setState({
                todos: TodoStore.getAll()
            });
        })
    }

    render() {
        let list_box = null;
        let filter_box = null;

        if (this.state.todos.length) {
            list_box = this.state.todos.filter(this.state.filter).map(this.makeListItem);
            filter_box = <ItemFilters setFilter={this.setFilter} itemNumber={this.state.todos.length}/>
        }

        return (
            <div>
                <TodoInput save={this.save} checked={this.state.allChecked} handleToggle={this.toggleAllChecked}/>
                {list_box}
                {filter_box}
            </div>
        );
    }
}

class TodoInput extends Component{
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }


    handleKeyDown(e) {
        if (e.keyCode !== 13) { return; }

        event.preventDefault();

        // this.props.save({
        //     text: e.target.value,
        //     completed:false
        // });
        let text = e.target.value;
        TodoActions.createTodo(text);

        e.target.value = "";
    }

    render() {
        return (
            <div>
                {/*<input type="checkbox" checked={this.props.checked} onChange={this.props.handleToggle} />*/}
                <input type="checkbox" onChange={this.props.handleToggle} />
                <input type="text" onKeyDown={this.handleKeyDown} />
            </div>
        )
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
