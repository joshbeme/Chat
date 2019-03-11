import {ADD_FRIENDS, REMOVE_FRIEND, LOAD_FRIENDS} from './actionTypes';

export const addFriends = (content)  => ({
    type: ADD_FRIENDS,
    payload:  content
      
})

export const removeFriend = content =>({
    type:REMOVE_FRIEND,
    payload: content

})

export const loadFriends = content =>({
    type:LOAD_FRIENDS,
    payload:content
    
})