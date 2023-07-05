'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Image from 'next/image';

import useLogin from './useLogin';

const Login = ({
  searchParams,
}: {
  searchParams: { email: string | undefined };
}) => {
  const { showPassword, formik } = useLogin(searchParams.email);

  const handleGoogleClick = () => {
    console.log('This is google click');
  };
  console.log(formik.errors);
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-xl font-normal">
      <div className="text-5xl font-extrabold">Log in to LICIA</div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:max-w-sm mt-16 transition-all duration-100"
      >
        <Input
          placeholder="Email"
          onBlur={formik.handleBlur}
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          type="email"
          className="w-full mt-8"
        />
        {showPassword && (
          <>
            <Input
              placeholder="Password"
              onBlur={formik.handleBlur}
              id="password"
              type="password"
              name="password"
              className="w-full mt-8"
              error={formik.touched.password && formik.errors.password}
            />
            <div className="mt-8 w-full text-center">
              <a href="/" className="p-1 text-navyBlue">
                Forgot Password?
              </a>
            </div>
          </>
        )}

        <Button label="Continue" className="w-full mt-8" type="submit" />
      </form>

      <div className="my-8 text-lg">Or</div>
      {!showPassword && (
        <button className="flex items-center w-96 h-16 rounded-full bg-white border-2 border-black">
          <Image
            src="/images/google_icon.svg"
            height={50}
            width={50}
            alt="Google Icon"
            className="pl-8"
          />

          <span className="flex-grow text-center pr-12">GOOGLE</span>
        </button>
      )}

      {showPassword && (
        <div>
          Don&apos;t have an account?{' '}
          <span>
            <a href="/" className="text-navyBlue m-2">
              Sign up
            </a>
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
