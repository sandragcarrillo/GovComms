import React, { useEffect, useState, useContext } from 'react';
import { Section, SectionItem, CodeFormatter, SectionButton } from '../../components/styled';
import Loader from '../../components/loader';
import { Web3Context, EnvContext } from '../../context';
import * as PushAPI from '@pushprotocol/restapi';
import { getCAIPAddress } from '../../helpers';

const ChannelsPage = () => {
  const { library, account } = useContext<any>(Web3Context);
  const { env, isCAIP } = useContext<any>(EnvContext);
  const [channelAddr, setChannelAddr] = useState<string>('');
  const [channelName, setChannelName] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState();
  const [channelListData, setChannelListData] = useState();
  const [subscriberData, setSubscriberData] = useState();
  const [subscriberStatus, setSubscriberStatus] = useState<boolean>();

  const channels = [
    {
      id: 1,
      name: 'Channel 1',
      channelAddress: 'eip155:0x90A48D5CF7343B08dA12E067680B4C6dbfE551Be',
    },
    {
      id: 2,
      name: 'Channel 2',
      channelAddress: 'eip155:0xc3316B766F05e9d4911416A8bC237aAe0Dd8f6F3',
    },
    {
      id: 3,
      name: 'Channel 3',
      channelAddress: 'eip155:0x16EB4622f00BEd1D27dCCb4C0684C0E16512A36f',
    },
  ];

  const updateChannelAddress = (e: React.SyntheticEvent<HTMLElement>) => {
    setChannelAddr((e.target as HTMLInputElement).value);
  };

  const updateChannelName = (e: React.SyntheticEvent<HTMLElement>) => {
    setChannelName((e.target as HTMLInputElement).value);
  };

  const testGetChannelByAddress = async () => {
    try {
      setLoading(true);

      // object for channel data
      const response = await PushAPI.channels.getChannel({
        channel: isCAIP ? getCAIPAddress(env, channelAddr) : channelAddr,
        env,
      });

      setChannelData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const testGetChannelByName = async () => {
    try {
      setLoading(true);

      // Array for channels data
      const response = await PushAPI.channels.search({
        query: channelName,
        env,
      });
      setChannelListData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const testGetSubscribers = async () => {
    try {
      setLoading(true);
      const response = await PushAPI.channels._getSubscribers({
        channel: isCAIP ? getCAIPAddress(env, channelAddr) : channelAddr,
        env,
      });

      setSubscriberData(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const testSubscriberStatus = async () => {
    try {
      setLoading(true);
      let subscriptions = await PushAPI.user.getSubscriptions({
        user: isCAIP ? getCAIPAddress(env, account) : account,
        env,
      });

      subscriptions = subscriptions.map((sub: any) => sub.channel.toLowerCase());

      const status = subscriptions.includes(channelAddr.toLowerCase());

      setSubscriberStatus(status);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const testOptFunctionality = async (channelAddress: string, optIn: boolean) => {
    const _signer = library.getSigner(account);

    try {
      setLoading(true);

      if (optIn) {
        await PushAPI.channels.subscribe({
          signer: _signer,
          channelAddress: isCAIP ? getCAIPAddress(env, channelAddress) : channelAddress,
          userAddress: isCAIP ? getCAIPAddress(env, account) : account,
          env,
          onSuccess: () => {
            console.log('opt in success');
            setSubscriberStatus(true);
          },
          onError: (e) => {
            console.error('opt in error', e);
          },
        });
      } else {
        await PushAPI.channels.unsubscribe({
          signer: _signer,
          channelAddress: isCAIP ? getCAIPAddress(env, channelAddress) : channelAddress,
          userAddress: isCAIP ? getCAIPAddress(env, account) : account,
          env,
          onSuccess: () => {
            console.log('opt out success');
            setSubscriberStatus(false);
          },
          onError: (e) => {
            console.error('opt out error', e);
          },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (channelData && channelData['channel']) {
      setChannelAddr(channelData['channel']);
    }
  }, [channelData]);

  useEffect(() => {
    // update the other data sections as well on opt in/out completion
    if (typeof subscriberStatus === 'boolean') {
      testGetChannelByAddress();
      testGetSubscribers();
    }
  }, [subscriberStatus]);

  return (
    <div>
      <h2>Channels Test page</h2>

      <Loader show={isLoading} />

      <Section>
        <SectionItem>
          <label>Channel Address</label>
          <input type="text" onChange={updateChannelAddress} value={channelAddr} style={{ width: 400, height: 30 }} />
          <SectionButton onClick={testGetChannelByAddress}>get channel data</SectionButton>
        </SectionItem>

        <SectionItem>
          <div>
            {channelData ? <CodeFormatter>{JSON.stringify(channelData, null, 4)}</CodeFormatter> : null}

            <SectionItem style={{ marginTop: 20 }}>
              <SectionButton onClick={testGetSubscribers}>get subscribers</SectionButton>
            </SectionItem>

            {subscriberData ? <CodeFormatter>{JSON.stringify(subscriberData, null, 4)}</CodeFormatter> : null}

            <SectionItem style={{ marginTop: 20 }}>
              <SectionButton onClick={testSubscriberStatus}>check if logged-in user is subscribed</SectionButton>
            </SectionItem>
            {typeof subscriberStatus === 'boolean' ? (
              <>
                <CodeFormatter>{JSON.stringify(subscriberStatus, null, 4)}</CodeFormatter>

                {/* Renderiza la lista de canales */}
                {channels.map((channel) => (
                  <div key={channel.id}>
                    <h3>{channel.name}</h3>
                    <p>Channel Address: {channel.channelAddress}</p>
                    {/* Agrega un botón para el opt-in y otro para el opt-out */}
                    {subscriberStatus ? (
                      <button onClick={() => testOptFunctionality(channel.channelAddress, false)}>OPT OUT</button>
                    ) : (
                      <button onClick={() => testOptFunctionality(channel.channelAddress, true)}>OPT IN</button>
                    )}
                  </div>
                ))}
              </>
            ) : null}
          </div>
        </SectionItem>

        <div style={{ marginTop: 50, paddingTop: 30, borderTop: '1px solid' }}>
          <SectionItem>
            <label>Channel Name</label>
            <input type="text" onChange={updateChannelName} value={channelName} style={{ width: 400, height: 30 }} />
            <SectionButton onClick={testGetChannelByName}>get channel data</SectionButton>
          </SectionItem>

          {channelListData ? <CodeFormatter>{JSON.stringify(channelListData, null, 4)}</CodeFormatter> : null}
        </div>
      </Section>
    </div>
  );
};

export default ChannelsPage;
