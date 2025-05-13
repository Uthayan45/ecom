import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 select-none',
  };

  const navigate = useNavigate();

  function handleRegister(data) {
    setIsLoading(true);
    axios
      .put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)
      .then((res) => {
        setErr(null);
        toast.success('Password has been reset successfully');
        localStorage.removeItem('email');
        setUserToken(res.data.token);
        localStorage.setItem('authToken', res.data.token);
        setIsLoading(false);
        if (res.status === 200) {
          navigate('/');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong, please try again');
        setIsLoading(false);
        setErr(err.response.data.message);
      });
  }

  const validate = Yup.object({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Za-z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>+\-_]/,
        'Password must contain at least one special character'
      )
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('email'),
      newPassword: '',
    },
    onSubmit: handleRegister,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <form
        method="post"
        className="max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl text-gray-500 mb-5 font-bold">
          Reset Password
        </h1>
        {err && <div className="bg-red-300 py-1 mb-4 font-light">{err}</div>}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.newPassword}
            </span>
          )}
        </div>
        {isLoading ? (
          <button {...buttonProps} disabled>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </button>
        ) : (
          <button {...buttonProps}>Submit</button>
        )}
      </form>
    </>
  );
}
