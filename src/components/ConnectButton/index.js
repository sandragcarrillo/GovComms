import { useEffect, useState } from "react";
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from "@web3-react/core";
import NotificationsTest from "../../pages/notifications";
import EmbedPage from "../../pages/embed";

const NETWORK_MAPPING = {
  1: 'ETH_MAIN_NET',
  42: 'ETH_KOVAN',
  3: 'ETH_ROPSTEN',
  37: 'POLYGON_MAINNET',
  80001: 'POLYGON_MUMBAI'
};

const ConnectButton = () => {
    
  const { active, account, activate, deactivate, chainId } = useWeb3React();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };
  

  const injected = new InjectedConnector({
    supportedChainIds: [1, 5, 80001],
  });

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', 'true');
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', 'false');
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected);
          localStorage.setItem('isWalletConnected', 'true');
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="flex items-center">
      {active ? (
        <>
          {/* <p>Connected with <span className="account">{account?.substring(0, 4)}...{account?.slice(-4)}</span></p>
          {chainId ? <p className="network">{NETWORK_MAPPING[chainId]}</p> : null} */}
          <EmbedPage />
          <button className="px-8 py-2 bg-pink-600 text-white rounded cursor-pointer" onClick={disconnect}>Disconnect wallet</button>
          {showSidebar && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-999 flex items-center justify-end">
              <div className="bg-white w-72 h-full p-20 relative">
                <button className="absolute top-3 right-3 border-none bg-transparent font-semibold text-lg cursor-pointer" onClick={handleSidebarToggle}>X</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button className="px-8 py-2 bg-purple-600 text-white rounded cursor-pointer" onClick={connect}>Connect wallet</button>
      )}
    </div>
  );
};

export default ConnectButton;
