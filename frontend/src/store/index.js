import { applyMiddleware, combineReducers, createStore } from "redux";
import {userReducer} from "./UserReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { tokenReducer } from "./TokenReducer";

const mainReducer = combineReducers({
    user: userReducer,
    token: tokenReducer
})

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)))