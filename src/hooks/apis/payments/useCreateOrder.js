import { useMutation } from '@tanstack/react-query';

import { createOrderRequest } from '@/apis/payments';
import { useAuth } from '@/hooks/context/useAuth';

export const useCreateOrder = () => {
  const { auth } = useAuth();

  const {
    mutateAsync: createOrderMutation,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (amount) => createOrderRequest({ token: auth?.token, amount }),
    onSuccess: (data) => {
      console.log('Order created successfully', data);
    },
    onError: (error) => {
      console.log('Error in creating order', error);
    },
  });

  return {
    error,
    isSuccess,
    isPending,
    createOrderMutation,
  };
};
