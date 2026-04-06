import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FlowProvider } from './context/JumbleMFlowContext';
import { UserSessionProvider } from './context/UserSessionContext';
import './app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserSessionProvider>
        <FlowProvider>
        <App />
        </FlowProvider>
      </UserSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
