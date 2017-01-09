import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import App from '../components/App';

class AppContainer extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <div style={{height: '100%'}}>
                    <App />
                </div>
            </Provider>
        );
    }
}

export default AppContainer;
