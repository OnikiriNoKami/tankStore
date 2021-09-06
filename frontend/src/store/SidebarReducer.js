import { CLOSE_SIDEBAR, OPEN_SIDEBAR, TOGLE_SIDEBAR } from "../actions/SidebarActions"


const defaultState = {
    isOpen: false
}

export const sidebarReducer = (state=defaultState, action) => {
    switch(action.type){
        case OPEN_SIDEBAR:
        case CLOSE_SIDEBAR:
            return { ...state, isOpen: action.payload}
        case TOGLE_SIDEBAR:
            return { ...state, isOpen: !state.isOpen}
        default: 
            return state
    }
}

export const sidebarClose = () => ({type: CLOSE_SIDEBAR, payload:false})
export const sidebarOpen = () => ({type: OPEN_SIDEBAR, payload: true})
export const sidebarTogle = () => ({type: TOGLE_SIDEBAR})