import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import {composeWithDevTools} from 'remote-redux-devtools';
import {ThunkMiddleware} from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware();

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));