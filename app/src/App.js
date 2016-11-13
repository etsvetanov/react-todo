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
        this.filterItems = this.filterItems.bind(this);
        this.makeListItem = this.makeListItem.bind(this);
        this.toggleAllChecked = this.toggleAllChecked.bind(this);

        this.filters = {
            'All': this.filterAll,
            'Active': this.filterActive,
            'Completed': this.filterCompleted
        }
        // this.handleItemChecked = this.handleItemChecked.bind(this);
        this.state = {
            todos: [
                {id: 1, text: 'Item 1', completed: true},
                {id: 2, text: 'Item 2', completed: false}
            ],
            filter: this.filterAll,
            allChecked: false
        }
    }

    setFilter(e) {
        debugger;
        this.setState({filter: this.filters[e.target.innerHTML]});

        // console.log('This is the event:', e);
        // console.log('target.value:', e.target.innerHTML);
    }

    save(item) {
        item.id = this.counter++;
        this.setState({todos: this.state.todos.concat([item])});
    }

    handleItemChecked(item) {
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

    makeListItem (item) {
        //debugger;
        return (
            <ListItem name={item.id} checked={item.completed} text={item.text}
                      key={item.id} onchange={this.handleItemChecked.bind(this, item)}
                      handleRemove={this.removeItem.bind(this, item)}/>
        )
    }

    toggleAllChecked(e) {
        //debugger;
        var state = e.target.checked;
        //debugger;
        for (var i = 0; i < this.state.todos.length; i++) {
            //debugger;
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
        // debugger;
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

        this.props.save({
            text: e.target.value,
            completed:false
        });

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
