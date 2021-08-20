import { CardActions } from "@material-ui/core"
import { TOKEN_DROP, TOKEN_LOAD } from "../actions/TokenActions"


const defaultState= {
    token: null
}

export const tokenReducer = (state = defaultState, action) => {
    switch(action.type){
        case TOKEN_LOAD:
            return {...state, token: action.payload}
        case TOKEN_DROP:
            return {...state, token: null}
        default:
            return state
    }
}

export const loadTokenAction = (payload) => ({type: TOKEN_LOAD, payload})
export const dropTokenAction = () => ({type: TOKEN_DROP})