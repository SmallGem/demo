import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import App from './App';
import Login from './Login';
import Cookie from './utils/Cookie';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faIgloo,
    faUser,
    faUnlock,
    faCheck,
    faExclamationTriangle,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faIgloo,
    faUser,
    faUnlock,
    faCheck,
    faExclamationTriangle,
    faAngleDown
);

const logged = () => {
    return !!new Cookie().get("username");

};

ReactDOM.render(
    logged() ? <App/> : <Login/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
