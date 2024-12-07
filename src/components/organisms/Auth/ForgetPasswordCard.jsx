import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const ForgetPasswordCard = ({
  onForgetPasswordFormSubmit,
  forgetPasswordForm,
  setForgetPasswordform,
  validationError,
  error,
  isSuccess,
  isPending,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Forget Password</CardTitle>
          <CardDescription>Enter your email for reset password</CardDescription>
          {validationError && (
            <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
              <TriangleAlert className='size-5' />
              <p>{validationError.message}</p>
            </div>
          )}
          {error && (
            <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
              <TriangleAlert className='size-5' />
              <p>{error.message}</p>
            </div>
          )}
          {isSuccess && (
            <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
              <FaCheck className='size-5' />
              <p>
                Successfully email sent. You will be redirected to sign in a few
                second . Check your email and reset password then sign in.
                <LucideLoader2 className='animate-spin ml-2' />
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form className='space-y-3' onSubmit={onForgetPasswordFormSubmit}>
            <Input
              placeholder='Email'
              required
              type='email'
              disabled={isPending}
              onChange={(e) =>
                setForgetPasswordform({
                  ...forgetPasswordForm,
                  email: e.target.value,
                })
              }
            />
            <Button disabled={false} size='lg' type='submit' className='w-full'>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
