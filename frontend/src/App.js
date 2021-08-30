import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { store } from './store';
import {SnackbarProvider} from 'notistack';
import Layout from './components/Layout'

function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={5}>
          <Layout/>

        </SnackbarProvider>
      </Provider>      
    </BrowserRouter>
  );
}

export default App;
