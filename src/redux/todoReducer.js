
const initialState = {
    todos: [],
    todosMap: {}
};

let idSequence = 0;

export function todoReducer(state = initialState, action) {

    const updateTodo = (id, callback) => {
        const newList = [...state.todos];
        const oldItem = state.todosMap[id];
        const newItem = {...oldItem};
        callback(newItem);
        const indexOfItem = state.todos.indexOf(oldItem);
        newList[indexOfItem] = newItem;
        const newMap = {...state.todosMap};
        newMap[id] = newItem;
        return [newList, newMap];
    };

    switch (action.type) {
        case 'add': {
            const newId = idSequence++;
            const newItem = {
                id: newId,
                complete: false,
                description: 'new item'
            };
            const newMap = {...state.todosMap};
            newMap[newId] = newItem;
            return {...state, todos: [...state.todos, newItem], todosMap: newMap};
        }
        case 'updateDescription': {
            const id = action.payload.id;
            const newDescription = action.payload.value;
            const [newList, newMap] = updateTodo(id, todo => todo.description = newDescription);
            return {...state, todos: newList, todosMap: newMap};
        }
        case 'setComplete': {
            const id = action.payload.id;
            const newComplete = action.payload.value;
            const [newList, newMap] = updateTodo(id, todo => todo.complete = newComplete);
            return {...state, todos: newList, todosMap: newMap};
        }
        default: {
            return state
        }
    }
}