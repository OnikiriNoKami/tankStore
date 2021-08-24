import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import {Provider} from 'react-redux';
import { store } from './store';
import Messages from './components/Messages';
import StatusMonitor from './components/StatusMonitor';
import TokenLoader from './components/TokenLoader';



function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <TokenLoader/>
        <Messages/>
        <StatusMonitor/>
        <AppRouter />
      </Provider>      
    </BrowserRouter>
  );
}

export default App;
