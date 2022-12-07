import { createStore } from 'redux';

const reducerFn = (state = { uid: null, userData: null }, action) => {
    switch(action.type) {
        case 'uid':
            return {...state, uid: action.payload}
        case 'userData':
            return {...state, userData: action.payload}
    }
    return state;
}

const store = createStore(reducerFn);
export default store;