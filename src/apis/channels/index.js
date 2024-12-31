import axios from '@/config/axiosConfig';

export const getChannelByIdRequest = async ({ channelId, token }) => {
  try {
    const response = await axios.get(`/channels/${channelId}`, {
      headers: {
        'x-access-token': token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log('Error in getChannelById', error);
  }
};

export const getPaginatedMessages = async ({
  channelId,
  limit,
  offset,
  token,
}) => {
  try {
    const response = await axios.get(`/messages/${channelId}`, {
      params: {
        limit: limit || 20,
        offset: offset || 0,
      },
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in getPaginatedMessages', error);
  }
};
