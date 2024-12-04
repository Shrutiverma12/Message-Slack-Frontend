import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/apis/auth/useSignin';

import { SigninCard } from './SigninCard';

export const SigninContainer = () => {
  const navigate = useNavigate();

  const [signinForm, setsigninForm] = useState({ email: '', password: '' });

  const [validationError, setValidationError] = useState(null);

  const { isSuccess, isPending, error, signinMutation } = useSignin();

  const onSigninFormSubmit = async (e) => {
    e.preventDefault();
    if (!signinForm.email || !signinForm.password) {
      console.log('Please fill all the fields');
      setValidationError({ message: 'Please fill all the fields' });
    }

    setValidationError(null);

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  });

  return (
    <SigninCard
      onSigninFormSubmit={onSigninFormSubmit}
      signinForm={signinForm}
      setsigninForm={setsigninForm}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
