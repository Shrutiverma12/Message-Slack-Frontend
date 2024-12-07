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

export const ResetPasswordCard = ({
  onResetPasswordFormSubmit,
  resetPasswordForm,
  setResetPasswordForm,
  validationError,
  error,
  isSuccess,
  isPending,
}) => {
  return (
    <>
      <Card className='w-full h-full'>
        <CardHeader>
          <CardTitle className='text-xl'>Reset Password</CardTitle>
          <CardDescription>Create a new password</CardDescription>
        </CardHeader>
        {validationError && (
          <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className='size-5' />
            <p>{validationError.message}</p>
          </div>
        )}
        {error && (
          <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className='size-5' />
            <p>{error.message}error</p>
          </div>
        )}
        {isSuccess && (
          <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
            <FaCheck className='size-5' />
            <p>
              Successfully password reseted. You will be redirected to login
              page in a few second
              <LucideLoader2 className='animate-spin ml-2' />
            </p>
          </div>
        )}
        <CardContent>
          <form className='space-y-3' onSubmit={onResetPasswordFormSubmit}>
            <Input
              placeholder='Password '
              required
              onChange={(e) =>
                setResetPasswordForm({
                  ...resetPasswordForm,
                  password: e.target.value,
                })
              }
              value={resetPasswordForm.password}
              type='password'
              disabled={isPending}
            />
            <Input
              placeholder='Confirm Passsword'
              required
              onChange={(e) =>
                setResetPasswordForm({
                  ...resetPasswordForm,
                  confirmPassword: e.target.value,
                })
              }
              value={resetPasswordForm.confirmPassword}
              type='password'
              disabled={isPending}
            />

            <Button disabled={false} size='lg' type='submit' className='w-full'>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
