import * as PushAPI from "@pushprotocol/restapi";
import * as ethers  from 'ethers';
import { useState, useContext } from 'react';
import { Web3Context, EnvContext } from '../../context';
import Loader from "../../components/loader";
import { Link } from 'react-router-dom';


const SendMessageTest = () => {
  const { account: acc, library } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [isLoading, setLoading] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('Text');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [sendResponse, setSendResponse] = useState<any>('');
  const [account, setAccount] = useState(acc);

  const updateMessageContent = (e: React.SyntheticEvent<HTMLElement>) => {
    setMessageContent((e.target as HTMLInputElement).value);
  };

  const updateAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const updateReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  };

  const testSendMessage = async (index: number) => {
    try {
      setLoading(true);

      let response;
      switch (index) {
        case 0: {
          const librarySigner = await library.getSigner();
          response = await PushAPI.chat.send({
            messageContent,
            messageType: 'Text',
            receiverAddress,
            signer: librarySigner,
            env,
            account,
          });
          break;
        }
        case 1: {
          const walletPvtKey =
            '4f380c43fe3fcb887ce5104cfae4fa049427233855c9003cbb87f720a1d911bc';
          const Pkey = `0x${walletPvtKey}`;
          const pvtKeySigner = new ethers.Wallet(Pkey);
          response = await PushAPI.chat.send({
            messageContent,
            messageType: 'Text',
            receiverAddress,
            signer: pvtKeySigner,
            env,
            account,
          });
          break;
        }
        default:
          break;
      }

      setSendResponse(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <div className=" flex justify-between text-white">
    <div className="p-1 shadow-xl max-w-xl ml-64 mt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">
      <div className=" bg-black p-6 rounded-xl">
        <div className="">
        <div className="relative  mt-12  flex flex-col  justify-center items-center  bg-black shadow-xl rounded-xl">
        <h5 className="text-xl ">Send Message</h5>

        {isLoading && <Loader show={isLoading} />}

        <div className="p-4">
          <div className="mb-4">
            <label className="block mb-2">Message Content</label>
             
            <div className="max-w-xl">
          <label
            className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="font-medium text-gray-600">
                Drop files to Attach, or
                <span className="text-blue-600 underline">browse</span>
            </span>
            </span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
           </label>
        </div>

            <input
              type="text"
              onChange={updateMessageContent}
              value={messageContent}
              placeholder="Write your message"
              className="w-full mt-4 p-2 text-xl text-black  border border-gray-300 rounded-xl" />
          </div>

          <div className="flex flex-col min-w-min justify-center items-center  mb-4">
            <label className="block mb-2">Message Type</label>
            <div className="flex space-x-28 mt-4  ">
            <div className="">
            <div>
              <input
                type="radio"
                name="messageType"
                value="Text"
                checked={messageType === 'Text'}
                onChange={() => setMessageType('Text')} />
              <label className="ml-2">Text</label>
            </div>

            <div>
              <input
                type="radio"
                name="messageType"
                value="Image"
                checked={messageType === 'Image'}
                onChange={() => setMessageType('Image')} />
              <label className="ml-2">Image</label>
            </div>
            </div>

            <div className="">
            <div>
              <input
                type="radio"
                name="messageType"
                value="File"
                checked={messageType === 'File'}
                onChange={() => setMessageType('File')} />
              <label className="ml-2">File</label>
            </div>
          
            <div>
              <input
                type="radio"
                name="messageType"
                value="MediaURL"
                checked={messageType === 'MediaURL'}
                onChange={() => setMessageType('MediaURL')} />
              <label className="ml-2">MediaURL</label>
            </div>
            </div>
            </div>


          </div>



          <div className="mb-4">
            <label className="block mb-2">Receiver's Address</label>
            <input
              type="text"
              onChange={updateReceiverAddress}
              value={receiverAddress}
              placeholder="0x..."
              className="w-full p-2 border text-xl text-black border-gray-300 rounded-xl" />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Account</label>
            <input
              type="text"
              onChange={updateAccount}
              value={account}
              className="w-full p-2 text-xl text-black border border-gray-300 rounded-xl" />
          </div>
          <div className="flex space-x-4 mt-4 place-items-center ">
            <div className="mb-4">
            <button
          onClick={() => testSendMessage(0)}
          className="relative block group ">
          <span className="absolute inset-0  bg-pink-500  rounded-lg"></span>
          <div className="transition bg-black relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-2 ">
              <p className="text-xl font-outerSans font-medium">Send direct message</p>
            </div>
          </div>
        </button>

        <button 
          className="relative block group ">
            <Link to={'https://staging.push.org/chat/chatid:abcb1bbd1e1b0b3bd33d2db8a93ecbb72e323f8896ea4e7da7a52723c4450bbf'}>
            <span className="absolute inset-0  bg-indigo-500  rounded-lg"></span>
          <div className="transition bg-black relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
            <div className="p-2 ">
              <p className="text-xl font-outerSans font-medium">Join Group Chat</p>
            </div>
          </div>
            </Link>
          
        </button>
            </div>


          </div>
          {sendResponse && (
            <div className="p-4 border border-gray-300">
              <pre>{JSON.stringify(sendResponse, null, 4)}</pre>
            </div>
          )}

        </div>
      </div>
        </div>
      </div>
    </div>

  </div>
    </>
  );
};

export default SendMessageTest;