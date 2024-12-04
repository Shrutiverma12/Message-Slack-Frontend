import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SigninCard = ({
  signinForm,
  setsigninForm,
  onSigninFormSubmit,
  validationError,
  error,
  isSuccess,
  ispending,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Card classname='w-full h-full'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign In</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
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
                Successfully signed in. You will be redirected to Home page in a
                few second
                <LucideLoader2 className='animate-spin ml-2' />
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form className='space-y-3' onSubmit={onSigninFormSubmit}>
            <Input
              placeholder='Email'
              required
              onChange={(e) =>
                setsigninForm({ ...signinForm, email: e.target.value })
              }
              value={signinForm.email}
              type='email'
              disabled={ispending}
            />
            <Input
              placeholder='Password '
              required
              onChange={(e) =>
                setsigninForm({ ...signinForm, password: e.target.value })
              }
              value={signinForm.password}
              type='password'
              disabled={ispending}
            />

            <Button disabled={false} size='lg' type='submit' className='w-full'>
              Continue
            </Button>
          </form>

          <Separator className='my-5' />
          <p className='text-sm text-muted-foreground mt-4'>
            Do not have an account?{' '}
            <span
              onClick={() => navigate('/auth/signup')}
              className='text-sky-600 hover:underline cursor-pointer'
            >
              {' '}
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
