import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForgetPassword } from '@/hooks/apis/auth/useForgetPassword';

import { ForgetPasswordCard } from './ForgetPasswordCard';

export const ForgetPasswordConatiner = () => {
  const navigate = useNavigate();
  const [forgetPasswordForm, setForgetPasswordform] = useState({ email: '' });

  const [validationError, setValidationError] = useState(null);

  const { isSuccess, isPending, error, forgetPasswordMutation } =
    useForgetPassword();

  const onForgetPasswordFormSubmit = async (e) => {
    e.preventDefault();
    if (!forgetPasswordForm.email) {
      console.log('Please fill all the fields');
      setValidationError({ message: 'Please fill all the fields' });
    }
    setValidationError(null);

    await forgetPasswordMutation({
      email: forgetPasswordForm.email,
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
    <ForgetPasswordCard
      onForgetPasswordFormSubmit={onForgetPasswordFormSubmit}
      forgetPasswordForm={forgetPasswordForm}
      setForgetPasswordform={setForgetPasswordform}
      validationError={validationError}
      error={error}
      isSuccess={isSuccess}
      isPending={isPending}
    />
  );
};
