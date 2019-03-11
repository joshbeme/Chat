import {combineReducers} from 'redux';
import search from './search';
import friends from './friends'

export default combineReducers({search, friends})