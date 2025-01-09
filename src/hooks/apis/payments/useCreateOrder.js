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
    onSuccess: () => {
      console.log('Order created successfully');
    },
    onError: (error) => {
      console.log('Error in creating order', error);
    },
  });
  return {
    createOrderMutation,
    error,
    isSuccess,
    isPending,
  };
};
