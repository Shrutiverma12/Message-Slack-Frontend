import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
  try {
    const response = await axios.post(
      '/workspaces',
      { name, description },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log('Response is', response?.data);
    return response?.data?.data;
  } catch (error) {
    console.log('Error in create workspace request', error);
    throw error.response.data;
  }
};

export const fetchWorkspacesRequest = async ({ token }) => {
  try {
    const response = await axios.get('/workspaces', {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Response is fetch', response?.data);

    return response?.data?.data;
  } catch (error) {
    console.log('Error in fetching workspace request', error);
    throw error.response.data;
  }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in fetching workspace details request', error);
    throw error.response.data;
  }
};
