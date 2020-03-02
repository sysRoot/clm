import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import createStore from "./store";
import auth from "./auth.json";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

try {
    firebase.initializeApp(auth);
    
} catch (error) {
    console.log("Where is this", error);
}

const store = createStore();

const rrfProps = {
    firebase,
    config: {
        userProfile: "users"
    },
    dispatch: store.dispatch
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
