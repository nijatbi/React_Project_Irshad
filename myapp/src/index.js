import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store/store';
import Dashboard from './Admin/Dashboard';
import AuthorizationHOC from './components/AuthorizationHOC';

const root = ReactDOM.createRoot(document.getElementById('root'));
const AuthorizedDashboard = AuthorizationHOC(Dashboard, ['Admin',"SuperAdmin"]);
root.render(
  <Provider store={store}>
       <BrowserRouter>
          <Routes>
              <Route  path="/*" element={<App/>}/>
              <Route path='/Admin/*' element={<AuthorizedDashboard></AuthorizedDashboard>}></Route>
          </Routes>
  </BrowserRouter>
  </Provider>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
