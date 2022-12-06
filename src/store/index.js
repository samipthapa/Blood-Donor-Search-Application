import { createStore } from 'redux';

const reducerFn = (state = { uid: null, loggedIn: false }, action) => {
    switch(action.type) {
        case 'uid':
            return {...state, uid: action.payload}
        case 'loggedIn':
            return {...state, loggedIn: !loggedIn}
    }
    return state;
}

const store = createStore(reducerFn);
export default store;