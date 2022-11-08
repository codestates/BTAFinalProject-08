import { CHAIN_NAME } from '../constants';
import * as wallet from '../utils/wallet';
import * as storage from '../utils/storage';

export const getAddress = async () => {
  const { mnemonic } = await storage.utils.getStorageData('mnemonic');
  if (mnemonic) {
    const chain = await wallet.utils.getChain(CHAIN_NAME);
    const signer = await wallet.utils.getSigner(mnemonic, chain);
    const address = await wallet.utils.getAddress(signer);
    console.log({ chain, signer, address });
    return address;
  } else return null;
};
