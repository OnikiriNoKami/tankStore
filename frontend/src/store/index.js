import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer from "./UserReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const mainReducer = combineReducers({
    user: userReducer
})

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)))