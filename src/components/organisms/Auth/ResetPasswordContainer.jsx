import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useResetPassword } from '@/hooks/apis/auth/useResetPassword';

import { ResetPasswordCard } from './ResetPasswordCard';

export const ResetPasswordContainer = () => {
  const navigate = useNavigate();
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const { isPending, isSuccess, error, resetPasswordMutation } =
    useResetPassword();

  const [validationError, setValidationError] = useState(null);

  const onResetPasswordFormSubmit = async (e) => {
    e.preventDefault();

    if (!resetPasswordForm.password || !resetPasswordForm.confirmPassword) {
      console.log('All fields are required');
      setValidationError({ message: 'All fields are required' });
      return;
    }

    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      console.log('Password do not match');
      setValidationError({ message: 'Password do not match' });
      return;
    }

    setValidationError(null);

    await resetPasswordMutation({
      password: resetPasswordForm.password,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000);
    }
  });
  return (
    <ResetPasswordCard
      onResetPasswordFormSubmit={onResetPasswordFormSubmit}
      resetPasswordForm={resetPasswordForm}
      setResetPasswordForm={setResetPasswordForm}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
