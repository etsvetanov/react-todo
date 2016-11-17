import React from 'react';
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


export default TodoFilters;