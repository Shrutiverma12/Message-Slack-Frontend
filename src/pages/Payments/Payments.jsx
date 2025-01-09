import { useState } from 'react';

import { RenderRazorpayPopup } from '@/components/molecules/RenderRazorpayPopup/RenderRazorpayPopup';
import { useCreateOrder } from '@/hooks/apis/payments/useCreateOrder';

export const Payments = () => {
  const [amount, setAmount] = useState('');
  const [orderResponse, setOrderResponse] = useState(null);
  const { createOrderMutation, error, isSuccess, isPending } = useCreateOrder();

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await createOrderMutation(amount * 100);
    setOrderResponse(response?.data?.data);
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Make a Payment</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Amount:
            </label>
            <input
              type='number'
              name='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Pay
            </button>
            {isSuccess && (
              <RenderRazorpayPopup
                amount={amount * 100}
                orderId={orderResponse?.id}
                keyId={import.meta.env.VITE_RAZORPAY_KEY_ID}
                currency={'INR'}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
