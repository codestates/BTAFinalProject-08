import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <Popup />
  </BrowserRouter>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
