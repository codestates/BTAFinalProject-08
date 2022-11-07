import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

render(
  <RecoilRoot>
    <BrowserRouter>
      <Popup />
    </BrowserRouter>
  </RecoilRoot>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
