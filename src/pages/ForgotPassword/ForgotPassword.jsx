import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  };

  const navigate = useNavigate();

  function handleForgotPassword(data) {
    setIsLoading(true);

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
      .then((res) => {
        setErr(null);
        toast.success('An email has been sent to you!');
        setIsLoading(false);
        if (res.data.statusMsg === 'success') {
          localStorage.setItem('email', data.email);
          navigate('verifyCode');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
        throw err;
      });
  }

  const validate = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Email is not valid'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleForgotPassword,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Fogot Password</title>
      </Helmet>

      <form
        method="post"
        className="max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl text-gray-500 mb-5 font-bold">
          Enter Your Email:
        </h1>
        {err && <div className="bg-red-300 py-1 mb-4 font-light">{err}</div>}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.email}
            </span>
          )}
        </div>

        {isLoading ? (
          <button {...buttonProps} disabled>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </button>
        ) : (
          <button {...buttonProps}>Reset Password</button>
        )}
      </form>
    </>
  );
}
