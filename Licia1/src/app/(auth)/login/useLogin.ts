import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

function useLogin(email: string | undefined) {
  const [showPassword, setShowPassword] = useState(!!email);

  const formik = useFormik({
    initialValues: {
      email: email,
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required('Invalid email.'),
      password: yup.string().when('email', {
        is: (email: string) => email && email.trim().length > 0 && showPassword,
        then: schema => schema.min(8).max(16).required(),
        otherwise: schema => schema.strip(),
      }),
    }),
    onSubmit: values => {
      console.log({ values });
      if (!email && !showPassword) {
        setShowPassword(true);
      } else {
        //Submit and login
        //redirect('/dashboard');
      }
    },
  });

  return {
    formik,
    showPassword,
  };
}

export default useLogin;
