import { useState } from 'react';
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

export const SigninCard = () => {
  const navigate = useNavigate();

  const [signinForm, setsigninForm] = useState({
    email: '',
    password: '',
    username: '',
  });
  return (
    <>
      <Card classname='w-full h-full'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign In</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-3'>
            <Input
              placeholder='Email'
              required
              onChange={(e) =>
                setsigninForm({ ...signinForm, email: e.target.value })
              }
              value={signinForm.email}
              type='email'
              disabled={false}
            />
            <Input
              placeholder='Password '
              required
              onChange={(e) =>
                setsigninForm({ ...signinForm, password: e.target.value })
              }
              value={signinForm.password}
              type='password'
              disabled={false}
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
