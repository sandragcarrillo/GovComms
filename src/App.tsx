import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import { Web3Context, EnvContext, SocketContext } from './context';
import { ReactComponent as PushLogo }  from './assets/pushLogo.svg';
import { Checkbox } from './components/checkbox';
import Dropdown from './components/dropdown';
import { useSDKSocket } from './hooks';
import NotificationsPage from './pages/notifications';
import ChannelsPage from './pages/channels';
import EmbedPage from './pages/embed';
import PayloadsPage from './pages/payloads';
import SocketPage from './pages/sockets';
import ConnectButton from '../src/components/ConnectButton'
import logo_dubini from "../src/assets/logo_dubini.png"
import { EmbedSDK } from "@pushprotocol/uiembed";
import Hero from "../src/assets/hero.png"
import grow from "../src/assets/grow.png"
import look from "../src/assets/look.png"
import build from "../src/assets/build.png"
import rewards from "../src/assets/rewards.png"
import nft from "../src/assets/nft.png"
import law from "../src/assets/law.png"
import SendMessageTest from './pages/chat';


interface Web3ReactState {
  chainId?: number;
  account?: string | null | undefined;
  active: boolean;
  error?: Error;
  library?: unknown;
}


const checkForWeb3Data = ({ library, active, account, chainId }: Web3ReactState) => {
  return library && active && account && chainId;
};

export function App() {
  const web3Data : Web3ReactState = useWeb3React();
  const [env, setEnv] = useState('prod');
  const [isCAIP, setIsCAIP] = useState(false);

  const socketData = useSDKSocket({
    account: web3Data.account,
    chainId: web3Data.chainId,
    env,
    isCAIP,
  })

  const onChangeEnv = (e: any) => {
    setEnv(e.target.value);
  };

  const onChangeCAIP = () => {
    setIsCAIP(!isCAIP);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
              <nav className=" w-full rounded-xl bg-black px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link
              to="/"
              aria-label="GovComms"
              title="GovComms"
              className="inline-flex items-center"
            >
              <img src={logo_dubini} alt="Logo" className="w-32" />
            </Link>
            <ul className="flex items-center hidden space-x-8 lg:flex">
                <ConnectButton />
            </ul>
            <div className="lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Link
                          to="/"
                          aria-label="GovComms"
                          title="GovComms"
                          className="inline-flex items-center"
                        >
                          <svg
                            className="w-8 text-deep-purple-accent-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                          >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                          </svg>
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            GovComms
                          </span>
                        </Link>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      <div className="font-family: 'Source Sans Pro',Arial,sans-serif;">

        <EnvContext.Provider value={{ env, isCAIP }}>
          {checkForWeb3Data(web3Data) ? (
            <Web3Context.Provider value={web3Data}>
              <SocketContext.Provider value={socketData}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <nav className="flex gap-6 justify-center w-full bg-black text-white font-medium tracking-wide ">
                        <Link to="/notifications" className='font-medium bg-black tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400'>Proposals</Link>
                        <Link to="/embed" className='nav-button'>Explore DAOs</Link>
                        <Link to="/payloads" className='nav-button'>Spaces</Link>
                      </nav>
                    }
                  />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/channels" element={<ChannelsPage />} />
                  <Route path="/payloads" element={<PayloadsPage />} />
                  <Route path="/socket" element={<SocketPage />} />
                  <Route path="/embed" element={<EmbedPage />} />
                  <Route path="/chat" element={< SendMessageTest/>} />
                </Routes>
                <div className='w-full p-28 h-auto gap-6 flex items-center justify-center flex-col'>
                <div className='text-center font-bold  text-6xl flex flex-col gap-2'>
                  <h1 className='text-white'>Web3 native space</h1>
                  <h1 className='text-[#5B17EB]'>governance</h1>
                </div>
                <img src={Hero} alt="Hero" className="w-72" />
                </div>
                <div className='flex gap-12 justify-center items-center mx-6 '>
                  <div className='flex flex-col w-1/2 '>
                    <div className='w-full px-10 py-4  bg-[#FFDE59] border-rounded rounded-md'>
                      <h1 className='font-bold text-xl text-center'>Community builders</h1>
                    </div>
                    <div className='bg-[#B8B8DF] h-auto'>
                    <div className=' flex m-4'>
                    <img src={build} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Communications for your governance
                    </p>
                    <p className=''>Everyone shares, discusses, votes, and works to keep contributing.</p>
                    </div>
                    </div>

                    <div className=' flex m-4'>
                    <img src={look} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Follow up proposals
                    </p>
                    <p className=''>Follow up what others are doing thanks to your vote.</p>
                    </div>
                    </div>

                    <div className=' flex m-4'>
                    <img src={grow} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Grow your community
                    </p>
                    <p className=''>Create rewards programs for those who participate the most.</p>
                    </div>
                    </div>
                    </div>
                  </div>
                  
                  <div className='flex flex-col w-1/2'>
                    <div className='w-full px-10 py-4 bg-[#38B6FF] border-rounded rounded-md'>
                      <h1 className='font-bold text-xl text-center'>Community members</h1>
                    </div>
                    <div className='bg-[#B8B8DF] h-auto'>
                    <div className=' flex m-4'>
                    <img src={law} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Fair Moderation
                    </p>
                    <p className=''>Freedom of speech in proposals conversations.</p>
                    </div>
                    </div>

                    <div className=' flex m-4'>
                    <img src={nft} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Proof of Work
                    </p>
                    <p className=''>Receive NFTs or POAPs that recognize your contributions.</p>
                    </div>
                    </div>

                    <div className=' flex m-4'>
                    <img src={rewards} alt="icon" className="w-12" />
                    <div className='mb-2'>
                    <p className='font-bold'>Merit-driven Social Network
                    </p>
                    <p className=''>Get better at proposals to grow in your DAO</p>
                    </div>
                    </div>
                    </div>
                  </div>

                </div>
              </SocketContext.Provider>
            </Web3Context.Provider>
          ) : null}
        </EnvContext.Provider>
      </div>
    </>
  );
}

export default App;
