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

  delete: function(item) {
      Dispatcher.dispatch({
          type: ActionTypes.DELETE,
          item: item
      })
  },

  update: function (item) {
      console.log('update action fired!');
      Dispatcher.dispatch({
          type: ActionTypes.UPDATE,
          item: item
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