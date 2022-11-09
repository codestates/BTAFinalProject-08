import { useEffect, useState } from 'react';
import * as storage from '../utils/storage';

const useAuth = () => {
  const [userState, setUserState] = useState({ auth: null, mnemonic: null });

  useEffect(() => {
    const fetchAuth = async () => {
      const { auth } = await storage.utils.getSyncStorageData('auth');
      const { mnemonic } = await storage.utils.getSessionStorageData(
        'mnemonic'
      );
      setUserState({ mnemonic: mnemonic, auth: auth });
    };
    fetchAuth();
  }, []);

  return userState;
};

export default useAuth;
