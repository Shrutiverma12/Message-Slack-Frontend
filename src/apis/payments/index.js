import axios from '../../config/axiosConfig';

export const createOrderRequest = async ({ token, amount }) => {
  try {
    const response = await axios.post(
      '/payments/order',
      {
        amount,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in creating order', error);
  }
};

export const capturePaymentRequest = async ({
  token,
  orderId,
  status,
  paymentId,
  signature,
}) => {
  try {
    console.log('Capture payment request', orderId, status, paymentId);
    const response = await axios.post(
      '/payments/capture',
      {
        orderId,
        status,
        paymentId,
        signature,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log(response);
    return response?.data?.data;
  } catch (error) {
    console.log('Error in capturing payment', error);
  }
};
