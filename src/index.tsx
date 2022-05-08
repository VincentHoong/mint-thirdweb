import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        <App />
      </ThirdwebProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
