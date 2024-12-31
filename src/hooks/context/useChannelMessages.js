import { useContext } from 'react';

import ChannelMessages from '@/context/ChannelMessages';

export const useChannelMessages = () => {
  return useContext(ChannelMessages);
};
