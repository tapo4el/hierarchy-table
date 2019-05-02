import * as React from 'react';
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

export default App;
