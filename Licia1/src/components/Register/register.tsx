'use client';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Input from '@/components/Input';
import Link from 'next/link';

import useRegister from './hooks/useRegister';
export const metadata = {
  title: 'Lica - Music Licensing Platform',
  description:
    'Licia is a music licensing platform that helps you clear and secure music rights for your production.',
};
const Register = () => {
  const { formik } = useRegister();

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-center w-80 text-5xl font-extrabold p-6 mb-8 mt-20">
        Sign Up
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="py-3 w-full">
          <Input
            onBlur={formik.handleBlur}
            placeholder="Email"
            type="email"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
        </div>

        <div className="py-3 w-full">
          <Input
            onBlur={formik.handleBlur}
            placeholder="Password"
            type="password"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
        </div>

        <div className="py-3 w-full">
          <Input
            onBlur={formik.handleBlur}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
          />
        </div>

        <div className="pt-6 pb-4 w-full">
          <Button
            className="bg-navyBlue text-white flex items-center justify-center w-80"
            type="submit"
          >
            CONTINUE
          </Button>
        </div>
      </form>

      <p className="my-4">OR</p>
      <p className="mb-20">
        Already have an account?
        <Link href="/login" className="text-navyBlue ml-2">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
