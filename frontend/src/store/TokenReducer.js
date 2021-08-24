import { TOKEN_DROP, TOKEN_LOAD, TOKEN_STORAGE } from "../actions/TokenActions"


const defaultState= {
    token: null, 
    fromStorage: false
}

export const tokenReducer = (state = defaultState, action) => {
    switch(action.type){
        case TOKEN_LOAD:
            return {...state, token: action.payload}
        case TOKEN_DROP:
            return {...state, token: null}
        case TOKEN_STORAGE:
            return {...state, fromStorage: action.payload}
        default:
            return state
    }
}

export const loadTokenAction = (payload) => ({type: TOKEN_LOAD, payload})
export const dropTokenAction = () => ({type: TOKEN_DROP})
export const tokenFromStorage = (payload) => ({type: TOKEN_STORAGE, payload})