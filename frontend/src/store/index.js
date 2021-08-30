import { applyMiddleware, combineReducers, createStore } from "redux";
import {userReducer} from "./UserReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { tokenReducer } from "./TokenReducer";
import { statusReducer } from "./StatusReducer";
import { messageReducer } from "./MessageStore";
import { nationReducer } from "./NationStore";
import { roleReducer } from "./RoleStore";
import { tankTypeReducer } from "./TankTypeStore";

const mainReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    status: statusReducer,
    messages: messageReducer,
    nations: nationReducer,
    roles: roleReducer,
    tankTypes: tankTypeReducer
})

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)))