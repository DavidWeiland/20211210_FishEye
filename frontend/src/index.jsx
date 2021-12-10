import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import Profile from './Pages/Profile';
import Error from './Pages/Error'
import { Provider } from 'react-redux'
import store from './Utils/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="login" element ={<LoginPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)