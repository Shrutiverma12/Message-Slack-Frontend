import axios from 'axios';

import axiosConfig from '@/config/axiosConfig';

export const uploadImageUrl = async ({ file }) => {
  const CLOUD_NAME = 'dpwwyvfvf';
  const UPLOAD_PRESET = 'message-slack';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  console.log('File is', file);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const data = await response;
    console.log('Response in uploading image to Cloudinary', data);
    return response?.data?.secure_url;
  } catch (error) {
    console.log('Error in uploading image to Cloudinary', error);
  }
};

export const getPresignedUrl = async ({ token }) => {
  try {
    const response = await axiosConfig.get('messages/pre-signed-url', {
      headers: {
        'x-access-token': token,
      },
    });
    console.log(
      'Response in get presigned image url from Cloudinary',
      response
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in uploading image to Cloudinary', error);
  }
};
