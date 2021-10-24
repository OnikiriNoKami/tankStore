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
import { sidebarReducer } from "./SidebarReducer";
import { tankStatusReducer } from "./TankStatusReducer";
import { moduleTypeReducer } from "./ModuleTypeReducer";
import { adminUsers } from "./AdminUsers";
import { tankReducer } from "./TankStore";
import { tanksReducer } from "./TanksStore";
import { mainImageReducer } from "./MainImage";



const mainReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    status: statusReducer,
    tank: tankReducer,
    mainImages: mainImageReducer,
    tanks: tanksReducer,
    users: adminUsers,
    nations: nationReducer,
    roles: roleReducer,
    tankTypes: tankTypeReducer,
    tankStatuses: tankStatusReducer,
    moduleTypes: moduleTypeReducer,
    messages: messageReducer,
    sidebar: sidebarReducer,
})

export const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunk)))