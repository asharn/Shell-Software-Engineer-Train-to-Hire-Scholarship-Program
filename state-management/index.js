function createStore(reduced){
    //The store should have four part
    //1. The state 
    //2. Get the state
    //3. Listen to change on the state
    //4. Update the state

    let state;
    
    let listeners = [];

    const getState = function getState(){
        return state;
    }
    const subscribe = function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) {
              return l !== listener;
            });
          };
    }

    const dispatch = function dispatch(action){
        state = reduced(state, action);
        listeners.forEach((listener) => {
            listener();
        });
    }

    return{
        getState,
        subscribe,
        dispatch
    }


}

function todos(state = [], action) {
    switch (action.type) {
      case "ADD_TODO":
        return state.concat([action.todo]);
      case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id !== action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.complete })
        );
      default:
        return state;
    }
  }
  
  function goals(state = [], action) {
    switch (action.type) {
      case "ADD_GOAL":
        return state.concat([action.goal]);
      case "REMOVE_GOAL":
        return state.filter((goal) => goal.id !== action.id);
      default:
        return state;
    }
  }
  
  function app(state = {}, action) {
    return {
      todos: todos(state.todos, action),
      goals: goals(state.goals, action),
    };
  }
  
  // We pass the root reducer to our store because
  // the createStore() function can only take in one reducer.
  
  const store = createStore(app);


  const ADD_TODO = 'ADD_TODO';
  const REMOVE_TODO = 'REMOVE_TODO';
  const TOGGLE_TODO = 'TOGGLE_TODO';

  const ADD_GOAL = 'ADD_GOAL';
  const REMOVE_GOAL = 'REMOVE_GOAL';

  function addTodoAction(todo){
      return {
          type: ADD_TODO,
          todo
      }
  }

  function removeTodoAction(id){
    return {
        type: REMOVE_TODO,
        id
    }
  }

  function toggleTodoAction(id){
    return {
        type: TOGGLE_TODO,
        id
    }
  }

  function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal
    }
  }


  function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id
    }
  }

store.subscribe(() => {
    console.log('The new state is : ', store.getState());
});

store.dispatch(addTodoAction({
    id:0,
    name: 'Learn Redux',
    complete: false
}));

store.dispatch(addTodoAction({
    id:1,
    name: 'Read a book',
    complete: true
}));

store.dispatch(addTodoAction({
    id:2,
    name: 'Eat Medicine',
    complete: false
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
    id:0,
    name: 'Reduce 20 pound'
}));

store.dispatch(addGoalAction({
    id:1,
    name: 'Eat carb 20gm each day'
}));

store.dispatch(removeGoalAction(0));

