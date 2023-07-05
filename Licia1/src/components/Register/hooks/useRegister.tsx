import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function useRegister() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      // Please add a max length of 100 for email address.
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .max(100, 'Email must be less than 100 characters'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password must be less than 16 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),

    onSubmit: async (values: { email: any; password: any }) => {
      axios
        .post('https://licia.stageit.dev/api/api/auth/local/register', {
          username: values.email,
          email: values.email,
          password: values.password,
        })
        .then(response => {
          console.log('JWT:', response.data.jwt);
          // Handle success.
          alert("You've successfully signed up!");
        })
        .catch(error => {
          console.log(error.response);
        });
    },
  });

  return { formik };
}

export default useRegister;
