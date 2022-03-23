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
import Success from './app-components/success';
import About from './app-components/About';

export default class App extends React.PureComponent {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/sign-up' element={<SignUpForm />} />
          <Route exact path='/screenshot' element={<Screenshotter />} />
          <Route exact path='/success' element={<Success />} />
          <Route exact path='/about' element={<About />} />
        </Routes>
      </HashRouter>
    );
  }
}