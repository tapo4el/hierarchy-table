import {
    applyMiddleware,
    createStore,
    Action,
    Store,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import dataReceived from './actions';
import { UserResponse, AppState } from './types';
import { UserAPI } from './utils/api';

export default function configureStore(getUsers: UserAPI): Store<AppState> {
    const store = createStore(reducers, applyMiddleware(thunk));
    getUsers().then((data: UserResponse[]): Action => store.dispatch(dataReceived(data)));
    return store;
}
