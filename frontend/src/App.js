import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import AppRouter from './components/AppRouter'


function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout/>

      </Provider>      
    </BrowserRouter>
  );
}

export default App;
