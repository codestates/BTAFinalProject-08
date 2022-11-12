import { API_URL, CHAIN_NAME } from '../constants';
import * as wallet from '../utils/wallet';
import * as storage from '../utils/storage';
import { useEffect, useState } from 'react';

export const useGetSignerInfo = () => {
  const [signerInfo, setSignerInfo] = useState({});
  useEffect(() => {
    const fetchSignerInfo = async () => {
      const { mnemonic } = await storage.utils.getSessionStorageData(
        'mnemonic'
      );

      if (mnemonic) {
        const chain = await wallet.utils.getChain(CHAIN_NAME);
        const signer = await wallet.utils.getSigner(mnemonic, chain);
        const signingClient = await wallet.utils.getSigningClient(
          API_URL,
          signer
        );
        const address = await wallet.utils.getAddress(signer);
        console.log({ chain, signingClient, address });
        setSignerInfo({ chain, signingClient, address });
      }
    };

    fetchSignerInfo();
  }, []);

  return { signerInfo };
};
