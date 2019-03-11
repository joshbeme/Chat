import {ADD_FRIENDS, REMOVE_FRIEND, LOAD_FRIENDS} from '../actionTypes'
const inititalState = {
    list: {}

}

export default function(state = inititalState, action){
    switch(action.type){
        case LOAD_FRIENDS: {
            const friends = action.payload
            return {
                ...state,
                list: friends
            }
        }
        default:{
            return state
        }
    }
}