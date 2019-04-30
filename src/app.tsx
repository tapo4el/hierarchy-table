import React from 'react';
import { hot } from 'react-hot-loader';
import 'reset-css';

import Table from './components/Table';

class App extends React.PureComponent {
    render(): React.ReactNode {
        return (
            <div className="app">
                <Table tableName="users" />
            </div>
        );
    }
}

export default hot(module)(App);
