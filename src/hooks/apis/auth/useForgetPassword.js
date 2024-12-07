import { useMutation } from '@tanstack/react-query';

import { forgetPasswordRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useForgetPassword = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: forgetPasswordMutation,
  } = useMutation({
    mutationFn: forgetPasswordRequest,
    onSuccess: (data) => {
      console.log('Email sent successfully', data);
      toast({
        title: 'Email sent successfully and reset your password',
        message: 'Email sent successfully and reset your password',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log('Failed to signin', error);
      toast({
        title: 'Failed to  sent mail in',
        message: error.message,
        type: 'error',
        variant: 'destructive',
      });
    },
  });
  return {
    isPending,
    isSuccess,
    error,
    forgetPasswordMutation,
  };
};
