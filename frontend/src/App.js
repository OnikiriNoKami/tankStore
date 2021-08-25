import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {Provider} from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';



function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout/>
        <AppRouter />
      </Provider>      
    </BrowserRouter>
  );
}

export default App;
