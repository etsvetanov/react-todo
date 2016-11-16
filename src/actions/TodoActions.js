import Dispatcher from '../dispatcher';
import ActionTypes from '../ActionTypes';

var todoActions = {
  createTodo: function(text) {
      console.log('action createTodo() called');
      Dispatcher.dispatch({
          type: ActionTypes.CREATE,
          text: text
      });
  },

  delete: function(id) {
      Dispatcher.dispatch({
          type: ActionTypes.DELETE,
          id: id
      })
  },

  update: function (id, item) {
      console.log('update action fired!');
      Dispatcher.dispatch({
          type: ActionTypes.UPDATE,
          item: item,
          id: id
      })
  },

  toggleAll: function (checked) {
      Dispatcher.dispatch({
          type: ActionTypes.TOGGLEALL,
          completed: checked
      })
  },

  setFilter: function (filter) {
      Dispatcher.dispatch({
          type: ActionTypes.FILTER,
          filter: filter
      })
  }
};

export default todoActions;