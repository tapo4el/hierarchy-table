import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <div className="app">Hello! Me</div>
        );
    }
}

export default hot(module)(App);
