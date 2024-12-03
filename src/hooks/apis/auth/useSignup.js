import { useMutation } from '@tanstack/react-query';

import { signUpRequest } from '@/apis/auth';
import { useToast } from '@/hooks/use-toast';

export const useSignup = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log('Successfully signed up', data);
      toast({
        title: 'Successfully signed up',
        message: 'You will be redirect to the login page in a few second',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log('Failed to signup', error);
      toast({
        title: 'Failed to  signed up',
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
    signupMutation,
  };
};
