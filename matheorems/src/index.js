import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './jsx/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

class Main extends Component {
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

ReactDOM.render(<Main/>, document.getElementById('root'));
registerServiceWorker();
