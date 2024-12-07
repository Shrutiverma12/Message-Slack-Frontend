import { useMutation } from '@tanstack/react-query';

import { resetPasswordRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useResetPassword = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: resetPasswordMutation,
  } = useMutation({
    mutationFn: resetPasswordRequest,

    onSuccess: (data) => {
      console.log('Password reset successfully', data);
      toast({
        title: 'Password reset successfully. Now Please signin',
        message: 'Password reset successfully. Now Please signin',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log('Failed to reset password', error);
      toast({
        title: 'Failed to reset password',
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
    resetPasswordMutation,
  };
};
