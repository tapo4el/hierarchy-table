import {
    applyMiddleware,
    createStore,
    Action,
    Store,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './reducers';
import api from './utils/api';
import { dataReceived } from './actions';
import { DataResponse, AppState } from './types';

const loadData = async (): Promise<DataResponse> => {
    const response = await api.getData();
    return response.json();
};

export default function configureStore(): Store<AppState> {
    const composeEnhancers = composeWithDevTools({ realtime: true });
    const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
    loadData().then((data: DataResponse): Action => store.dispatch(dataReceived(data)));
    return store;
}
