import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
import configureStore from './store';
import getUsers from './utils/api';

ReactDOM.render(
    <Provider store={configureStore(getUsers)}>
        <App />
    </Provider>,
    document.getElementById('app'),
);
