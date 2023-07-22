import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import App from './App';
import { Nav } from './components/main/Header';
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



function getLibrary(provider: any) {
  // this will vary according to whether you use e.g. ethers or web3.js
  const gottenProvider = new ethers.providers.Web3Provider(provider, "any");
  return gottenProvider;
}


root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <App />
      </Router>
    </Web3ReactProvider>
  </React.StrictMode>
);

