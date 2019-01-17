import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faIgloo,
    faUser,
    faUnlock,
    faCheck,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faIgloo,
    faUser,
    faUnlock,
    faCheck,
    faExclamationTriangle
);

const logged = () => {
    const cookie = document.cookie;
    const sessionName = "username";
    if (cookie.length > 0) {
        const sessionStart = cookie.indexOf(sessionName + "=");
        if (sessionStart !== -1) {
            const sessionEnd = cookie.indexOf(";", sessionStart + sessionName.length + 1);
            if (sessionEnd === -1) {
                const session = cookie.substring(sessionStart + sessionName.length + 1);
                if (session !== "" && session !== null) {
                    return true;
                }
            }
            const session = cookie.substring(sessionStart + sessionName.length + 1, sessionEnd);
            if (session !== "" && session !== null) {
                return true;
            }
        }
    }
    return false;
};

ReactDOM.render(
    logged() ? <App/> : <Login/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
