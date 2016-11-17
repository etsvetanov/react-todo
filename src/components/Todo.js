import React from 'react';
import todoActions from '../actions/TodoActions';


function Todo (props) {
    let currentItem = {
        text: props.text,
        completed: props.completed,
    };

    function handleChange(new_properties) {
        let newItem = Object.assign(currentItem, new_properties);

        todoActions.update(props.id, newItem);
    }

    return (
        <div>
            <input type="checkbox" name={props.id} checked={props.checked}
                   onChange={() => { handleChange({completed: !props.checked}); }}/> {props.text}
            <button onClick={() => {todoActions.delete(props.id)}}> x </button>
        </div>
    );
}


export default Todo;
