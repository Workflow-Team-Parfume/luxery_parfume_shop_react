import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwtDecode from 'jwt-decode';
import { AuthUserActionType, IUser } from './compnents/auth/types';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if(localStorage.token) {
  const token =localStorage.token;
  var user = jwtDecode(token) as IUser;
  store.dispatch({
      type: AuthUserActionType.LOGIN_USER,
      payload: {
          email: user.email,
          name: user.name
      }
  });
}
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
