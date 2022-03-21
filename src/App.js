import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.scss';
import 'dotenv/config'

import Home from './app-components/home';
import Screenshotter from './app-components/screenshotter';
import SignUpForm from './app-components/sign-up-form';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='fire-nearby/' element={<Home />} />
          <Route exact path='fire-nearby/sign-up' element={<SignUpForm />} />
          <Route exact path='fire-nearby/screenshot' element={<Screenshotter />} />
        </Routes>
      </Router>
    );
  }
}