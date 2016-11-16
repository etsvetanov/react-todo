import dispatcher from '../dispatcher';
import EventEmitter from 'events';
import actionTypes from '../ActionTypes';

console.log(EventEmitter);

var CHANGE_EVENT = 'change';

class TodoStore extends EventEmitter {
    constructor() {
        super();

        this.todos = {
            11111: {
                text: 'Item 1',
                completed: true
            },
            22222: {
                text: 'Item 2',
                completed: false
            }
        };

        this.filters = {
            'Active': this.filterActive,
            'Completed': this.filterCompleted
        };

        this.filterMethod = null;
    }


    filterActive(item) {
        return !item.completed;
    }

    filterCompleted(item) {
        return item.completed;
    }

    createTodo(text) {
        let id = Date.now();

        this.todos[id] = {
            text,
            completed: false
        };


        console.log('createTodo is going to emit \'change\' event...');
        this.emit('change');
    }


    deleteTodo(id) {
        debugger;
        delete this.todos[id];
        this.emit('change');
    }

    updateTodo(id, item) {
        this.todos[id] = {item};
        this.emit('change');
    }

    toggleAll(completed) {
        debugger;
        for (let property in this.todos) {
            if (this.todos.hasOwnProperty(property)) {
                this.todos[property].completed = completed;
            }
        }

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
        let ids = Object.keys(this.todos);
        let mapper = (id) => ({
            id: id,
            text: this.todos[id].text,
            completed: this.todos[id].text});

        let arr = ids.map(mapper);

        if (this.filterMethod) {
            arr = arr.filter(this.filterMethod);
        }

        return arr.sort((a, b) => a.id - b.id);
    }


    handleActions(action) {
        console.log('Store received an action:', action);
        switch(action.type) {
            case actionTypes.CREATE:
                this.createTodo(action.text);
                break;
            case actionTypes.DELETE:
                this.deleteTodo(action.id);
                break;
            case actionTypes.UPDATE:
                this.updateTodo(action.id, action.item);
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