import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';


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
        this.filterItems = this.filterItems.bind(this);
        this.getListItem = this.getListItem.bind(this);
        // this.handleChecked = this.handleChecked.bind(this);
        this.state = {
            todos: [
                {id: 1, text: 'Item 1', completed: true},
                {id: 2, text: 'Item 2', completed: false}
            ],
            filter: 'All'
        }
    }

    setFilter(e) {
        this.setState({filter: e.target.innerHTML});

        // console.log('This is the event:', e);
        // console.log('target.value:', e.target.innerHTML);
    }

    save(item) {
        item.id = this.counter++;
        this.setState({todos: this.state.todos.concat([item])});
    }

    handleChecked(item) {
        //debugger;
        item.completed = !item.completed;
        // this.setState({todos: this.state.todos});
        this.setState({});  // hurr durr it works
        //debugger;
    }

    removeItem(item) {
        var index = this.state.todos.indexOf(item);

        if (index > -1) {
            var arr = this.state.todos.splice(index, 1);
            this.setState({});
        }
    }

    getListItem (item) {
        //debugger;
        return (
            <ListItem name={item.id} checked={item.completed} text={item.text}
                      key={item.id} onchange={this.handleChecked.bind(this, item)}
                      handleRemove={this.removeItem.bind(this, item)}/>
        )
    }

    filterItems (item) {
        if (this.state.filter == 'Active' && item.completed) {
            return false;
        }

        if (this.state.filter == 'Completed' && !item.completed) {
            return false;
        }

        return true;
    }

    render() {
        //debugger;
        return (
            <div>
                <TodoInput save={this.save}/>
                {this.state.todos.filter(this.filterItems).map(this.getListItem)}
                <ItemFilters setFilter={this.setFilter} />
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

        this.props.save({
            text: e.target.value,
            completed:false
        });

        e.target.value = "";
    }

    render() {
        return (
            <input type="text" onKeyDown={this.handleKeyDown} />
        )
    }
}

// function TodoInput(props) {
//     return (
//         <input type="text" onKeyDown={props.handleKeyDown} />
//     );
// }

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
