import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwtDecode from 'jwt-decode';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  //<GoogleOAuthProvider clientId="200083464199-0h960k60j4f3v5bg0lvu7d2dob2cg93m.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  //</GoogleOAuthProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
