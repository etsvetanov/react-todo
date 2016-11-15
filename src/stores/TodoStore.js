import { EventEmitter } from "events";
import dispatcher from "../dispatcher.js";



class TodoStore extends EventEmitter {
    constructor() {
        super();

        this.todos = [
            {
                id: 111111,
                text: "Item 1",
                completed: false
            },
            {
                id: 22222,
                text: "Item 2",
                completed: true
            },
        ];
    }

    getAll() {
        return this.todos;
    }

    createTodo(text) {
        const id = Date.now();

        this.todos.push({
            id,
            text,
            completed: false,
        });

        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case 'CREATE_TODO': {
                console.log('going to create todo with text:', action.text);
                this.createTodo(action.text);
            }
        }
    }
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore))
window.dispatcher = dispatcher;
export default todoStore;

