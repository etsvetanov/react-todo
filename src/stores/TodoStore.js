import dispatcher from '../dispatcher';
import EventEmitter from 'events';
import actionTypes from '../ActionTypes';

console.log(EventEmitter);

var CHANGE_EVENT = 'change';

class TodoStore extends EventEmitter {
    constructor() {
        super();

        this.todos = [
            {
                id: 11111,
                text: 'Item 1',
                completed: true
            },
            {
                id: 22222,
                text: 'Item 2',
                completed: false
            }
        ];

        this.filters = {
            // 'All': this.filterAll,
            'Active': this.filterActive,
            'Completed': this.filterCompleted
        };

        this.filterMethod= null;
    }


    filterActive(item) {
        return !item.completed;
    }

    filterCompleted(item) {
        return item.completed;
    }

    createTodo(text) {
        let id = Date.now();

        this.todos.push({
            id,
            text,
            completed: false
        });

        console.log('createTodo is going to emit \'change\' event...');
        this.emit('change');
    }


    deleteTodo(item) {
        var index = this.todos.indexOf(item);

        if (index > -1) {
            this.todos.splice(index, 1);
        }

        this.emit('change');
    }

    updateTodo(item) {
        this.todos.forEach(function(element) {
            if (item.id === element.id) {
                element.id = item.id;
                element.text = item.text;
                element.completed = item.completed;
            }
        });

        this.emit('change');
    }

    toggleAll(completed) {
        this.todos.forEach(function(item) {
            item.completed = completed;
        });
        this.emit('change');
    }

    setFilter(filter) {
        filter = filter || null;
        if (this.filters[filter] !== this.filterMethod) {
            this.filterMethod = this.filters[filter];
            this.emit('change');
        }

    }

    getAll() {
        if (this.filterMethod) {
            return this.todos.filter(this.filterMethod);
        }

        return this.todos;
    }

    getNumber() {
        return this.todos.length;
    }

    handleActions(action) {
        console.log('Store received an action:', action);
        switch(action.type) {
            case actionTypes.CREATE:
                this.createTodo(action.text);
                break;
            case actionTypes.DELETE:
                this.deleteTodo(action.item);
                break;
            case actionTypes.UPDATE:
                this.updateTodo(action.item);
                break;
            case actionTypes.TOGGLEALL:
                this.toggleAll(action.completed);
                break;
            case actionTypes.FILTER:
                this.setFilter(action.filter);
                break;
            default:
                console.log('There is no such action type');
        }
    }



}

var todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;