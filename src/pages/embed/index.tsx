  import { useEffect, useContext } from 'react';
  import { EmbedSDK } from "@pushprotocol/uiembed";
  import { Web3Context } from '../../context';
  import DAO1 from "../../assets/DAO1.png"
  import DAO2 from "../../assets/DAO2.png"
  import DAO3 from "../../assets/DAO3.jpeg"


  const EmbedPage = () => {
      const { account, chainId } = useContext<any>(Web3Context);

      useEffect(() => {
          if (account) { // 'your connected wallet address'
            EmbedSDK.init({
              chainId,
              headerText: 'Notifications', // optional
              targetID: 'sdk-trigger-id', // mandatory
              appName: 'hackerApp', // mandatory
              user: account, // mandatory
              viewOptions: {
                  type: 'sidebar', // optional [default: 'sidebar', 'modal']
                  showUnreadIndicator: true, // optional
                  unreadIndicatorColor: '#cc1919',
                  unreadIndicatorPosition: 'top-right',
              },
              theme: 'light',
              onOpen: () => {
                console.log('-> client dApp onOpen callback');
              },
              onClose: () => {
                console.log('-> client dApp onClose callback');
              }
            });
          }
      
          return () => {
            EmbedSDK.cleanup();
          };
        }, [account, chainId]);


      return (
        <main className='bg-black '>
            <button id="sdk-trigger-id" className='m-2'><svg width="18" height="18" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.1336 11C18.7155 16.3755 21 18 21 18H3C3 18 6 15.8667 6 8.4C6 6.70261 6.63214 5.07475 7.75736 3.87452C8.88258 2.67428 10.4087 2 12 2C12.3373 2 12.6717 2.0303 13 2.08949" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            </svg></button>
            <div className='text-center font-bold justify-center items-center  flex flex-col gap-6 m-2'>
              <h1 className='text-white text-4xl'>Explore DAOs</h1>
                 <p className='text-white text-xl'>Click in "Opt-in" to get notifications of new proposals</p>
            </div>
             <div className="flex justify-center items-center bg-black items-center h-auto my-12">
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                 <div className="flex flex-col bg-white rounded-lg shadow p-4">
                   <img src={DAO1} alt="Card 1" className="h-48 w-full object-cover rounded-lg mb-4" />
                   <h3 className="text-xl font-semibold">1Hive</h3>
                   <p className="text-gray-600 mb-4">A community of web3 builders seeking to realize a future that is more free, fair, open, and humane. </p>
                   <button className="bg-[#38B6FF] text-white rounded-lg py-2 px-4">Opt-in</button>
                 </div>
                 <div className="flex flex-col bg-white rounded-lg shadow p-4">
                   <img src={DAO2} alt="Card 2" className="h-48 w-full object-cover rounded-lg mb-4" />
                   <h3 className="text-xl font-semibold">Aavegotchi</h3>
                   <p className="text-gray-600 mb-4">Open-source, community-owned NFT gaming protocol, enabling true asset ownership for gamers.</p>
                   <button className="bg-[#38B6FF] text-white rounded-lg py-2 px-4">Opt-in</button>
                 </div>
                 <div className="flex flex-col bg-white rounded-lg shadow p-4">
                   <img src={DAO3} alt="Card 3" className="h-48 w-full object-cover rounded-lg mb-4" />
                   <h3 className="text-xl font-semibold">ShapeShift DAO</h3>
                   <p className="text-gray-600 mb-4">DAO of ShapeShift. Welcome to your new, decentralized, multi-chain crypto home base</p>
                   <button className="bg-[#38B6FF] text-white rounded-lg py-2 px-4">Opt-in</button>
                 </div>
               </div>

            </div>
             </main>

      );
  }

  export default EmbedPage;