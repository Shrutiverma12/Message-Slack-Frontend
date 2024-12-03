import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignup } from '@/hooks/apis/auth/useSignup';

import { SignupCard } from './SignupCard';

export const SignupContainer = () => {
  const [signupForm, setsignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState();

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  async function onSignupFormSubmit(e) {
    e.preventDefault();
    console.log('Signup form submitted', signupForm);
    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.username
    ) {
      console.log('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      console.log('Password do not match');
      setValidationError({ message: 'Password do not match' });
      return;
    }
    setValidationError(null);

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      username: signupForm.username,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <SignupCard
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      signupForm={signupForm}
      setsignupForm={setsignupForm}
      validationError={validationError}
      onSignupFormSubmit={onSignupFormSubmit}
    />
  );
};
