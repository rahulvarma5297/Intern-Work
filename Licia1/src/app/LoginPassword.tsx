'use client';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from 'react';

const LoginPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleChange = event => {
    setEmail(event.target.value);
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const handleGoogleClick = () => {
    console.log('This is google click');
  };

  const handleContinueClick = () => {
    console.log('This is continue click');
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <p className="text-5xl font-extrabold mb-[72px]">Enter Your Password</p>

      <Input
        placeholder="Email"
        onChange={handleChange}
        name="email"
        className="mb-8 w-96 h-16"
        style={{ padding: '20.5px 32px', gap: '10px' }}
        onBlur={validateEmail}
        value={email}
      />

      <Input
        placeholder="Password"
        onChange={handleChangePassword}
        name="password"
        className="mb-8 w-96 h-16"
        style={{ padding: '20.5px 32px', gap: '10px' }}
        value={password}
      />

      <a href="/" className="p-1 text-navyBlue mb-8">
        Forgot Password?
      </a>

      <Button
        label="Continue"
        className="w-96 h-16 mb-8"
        onClick={handleContinueClick}
      />

      <p className="mb-8 text-lg">Or</p>

      <p>
        Don't have an account?{' '}
        <span>
          <a href="/" className="text-navyBlue m-2">
            Sign up
          </a>
        </span>
      </p>
    </div>
  );
};

export default LoginPassword;
