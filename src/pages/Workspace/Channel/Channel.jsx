import { useParams } from 'react-router-dom';

export const Channel = () => {
  const { channelId } = useParams();

  return <h1>Channel{channelId}</h1>;
};
