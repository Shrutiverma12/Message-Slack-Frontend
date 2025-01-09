import { useEffect } from 'react';

const loadRazorpayScript = (src) => {
  return new Promise((res) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('Script loaded');
      res(true);
    };
    script.onerror = () => {
      console.log('Error in script loaded');
      res(false);
    };
    document.body.appendChild(script);
  });
};

export const RenderRazorpayPopup = ({ orderId, keyId, currency, amount }) => {
  const display = async (options) => {
    const scriptResponse = await loadRazorpayScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!scriptResponse) {
      console.log('Error in loading script');
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handlePayment = async () => {};
  useEffect(() => {
    display({
      key: keyId,
      amount,
      currency,
      name: 'Shruti Verma',
      description: 'Test Transaction',
      order_id: orderId,
      //callback_url: 'http://localhost:3000/api/payments/capture',
      handler: (response) => {
        console.log('Payment success', response);
      },
    });
  }, []);

  return null;
};
