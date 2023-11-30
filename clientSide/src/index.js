import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';


import {BrowserRouter,Routes,Route} from 'react-router-dom'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
     
        <Route path='/*' element={<App/>} />
 
      </Routes>
      </Provider>
    </BrowserRouter>
);