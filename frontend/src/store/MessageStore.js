import { MANIPULATE_FAIL, MANIPULATE_SUCCESS } from "../actions/MessagesActions"

const defaultState = {
    showSuccess: false,
    showFail: false,
}

export const messageReducer = (state=defaultState, action) => {
    switch(action.type){
        case MANIPULATE_SUCCESS:
            return {...state, showSuccess: action.payload}
        case MANIPULATE_FAIL:
            return {...state, showFail: action.payload}
        default:
            return state

    }

}

export const successMessage = (payload) => ({type: MANIPULATE_SUCCESS, payload})
export const failMessage = (payload) => ({type: MANIPULATE_FAIL, payload})