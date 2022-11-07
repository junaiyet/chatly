import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebaseConfig from './firebaseConfig';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter,RouterProvider,Route,} from "react-router-dom";
import Registation from './pages/registration';
import Login from './pages/login';
import Home from './pages/home';
import ForgotPassword from './pages/forgotpassword';
import store from './store';
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {path: "/",element: <Home/>,},
  {path: "/registation",element: <Registation/>,},
  {path: "/login",element: <Login/>,},
  {path: "/forgotpassword",element: <ForgotPassword/>,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);

reportWebVitals();
