import React from 'react';
import {
  HashRouter,
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
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/sign-up' element={<SignUpForm />} />
          <Route exact path='/screenshot' element={<Screenshotter />} />
        </Routes>
      </HashRouter>
    );
  }
}