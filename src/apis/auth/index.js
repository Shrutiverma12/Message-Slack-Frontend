import axios from '@/config/axiosConfig';

export const signUpRequest = async ({ email, password, username }) => {
  try {
    const response = await axios.post('users/signup', {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const signInRequest = async ({ email, password }) => {
  try {
    const response = await axios.post('users/signin', {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const forgetPasswordRequest = async ({ email }) => {
  try {
    const response = await axios.post('users/forgetPassword', {
      email,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const resetPasswordRequest = async ({ password }) => {
  try {
    const token = window.location.pathname.split('/').pop();
    const response = axios.post(`users/reset-password/${token}`, {
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
