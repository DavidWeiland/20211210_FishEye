import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './Utils/Styles/style.css'
import Header from './Components/Header';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import Profile from './Pages/Profile';
import NewPhotographer from './Pages/CreateNewPhotographer'
import NewMedia from './Pages/CreateNewMedia'
import ModifyMedia from './Pages/ModifyMedia';
import Error from './Pages/Error'
import { Provider } from 'react-redux'
import store from './Utils/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="login" element ={<LoginPage />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="new_photographer" element={<NewPhotographer />} />
          <Route path="new_media" element={<NewMedia />} />
          <Route path="modify_media/:mediaId" element={<ModifyMedia />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)