import { useMutation } from '@tanstack/react-query';

import { capturePaymentRequest } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCaptureOrder = () => {
  const { auth } = useAuth();
  const {
    mutateAsync: capturePaymentMutation,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: ({ orderId, status, paymentId, signature }) =>
      capturePaymentRequest({
        token: auth.token,
        orderId,
        status,
        paymentId,
        signature,
      }),
    onSuccess: () => {
      console.log('Payment capture successfully');
    },
    onError: (error) => {
      console.log('Error in capturing payment', error);
    },
  });
  return {
    capturePaymentMutation,
    error,
    isSuccess,
    isPending,
  };
};
