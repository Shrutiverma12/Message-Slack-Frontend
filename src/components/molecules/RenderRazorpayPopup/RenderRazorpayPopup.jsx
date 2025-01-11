import { useEffect } from 'react';

import { useCaptureOrder } from '@/hooks/apis/payments/useCaptureOrder';

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
  console.log('Render ', orderId, keyId, currency, amount);
  const { capturePaymentMutation } = useCaptureOrder();

  const display = async (options) => {
    const scriptResponse = await loadRazorpayScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!scriptResponse) {
      console.log('Error in loading script');
      return;
    }
    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', async function (response) {
      console.log('Payment Failed', response.error.code);
      await capturePaymentMutation({
        orderId: options.order_id,
        status: 'failed',
        paymentId: '',
      });
    });
    rzp.open();
  };

  useEffect(() => {
    {
      display({
        key: keyId,
        amount,
        currency,
        name: 'Shruti Verma',
        description: 'Test Transaction',
        order_id: orderId,
        //callback_url: 'http://localhost:3000/api/payments/capture',
        handler: async (response) => {
          console.log('Payment success', response);
          await capturePaymentMutation({
            orderId: orderId,
            status: 'success',
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          //redirect to custome success
        },
      });
    }
  }, [orderId]);

  return null;
};
