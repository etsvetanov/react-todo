import React, {Component} from 'react';
import todoActions from '../actions/TodoActions';


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

export default TodoInput;