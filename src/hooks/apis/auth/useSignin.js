import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/auth';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useSignin = () => {
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      console.log('Successfully signed in', response);
      const userObject = JSON.stringify(response.data);
      localStorage.setItem('user', userObject);
      localStorage.setItem('token', response.data.token);
      setAuth({
        token: response.data.token,
        user: response.data,
        loading: false,
      });

      toast({
        title: 'Successfully signed in',
        message: 'You will be redirect to the login page in a few second',
        type: 'success',
      });
    },
    onError: (error) => {
      console.log('Failed to signin', error);
      toast({
        title: 'Failed to  signed in',
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
    signinMutation,
  };
};
