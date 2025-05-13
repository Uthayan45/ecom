import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/Cart/Cart';
import { authContext } from '../../context/Auth/Auth';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { emptyCart } = useContext(cartContext);
  const { userToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'sm:w-36 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 select-none',
  };

  function handleCheckout(data) {
    setIsLoading(true);

    const config = {
      method: 'post',
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://ecommerce-nine-ivory-88.vercel.app/`,
      headers: {
        token: userToken,
      },
      data: data,
    };

    axios.request(config).then((response) => {
      setIsLoading(false);

      if (response.data.status === 'success') {
        window.location.href = response.data.session.url;
      }
    });
  }

  const validate = Yup.object({
    city: Yup.string()
      .required('Address is required')
      .min(3, 'Address must be at least 3 characters'),

    details: Yup.string(),

    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^01[0-2|5]{1}[0-9]{8}$/,
        'Phone number is not valid (01234567891)'
      ),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    onSubmit: handleCheckout,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="container">
        <form
          method="post"
          className="max-w-md mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-2xl text-gray-500 mb-5 font-bold">Checkout</h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Details
            </label>
            {formik.errors.details && formik.touched.details && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.details}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address*
            </label>
            {formik.errors.city && formik.touched.city && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.city}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number*
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.phone}
              </span>
            )}
          </div>
          {isLoading ? (
            <button {...buttonProps} disabled>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </button>
          ) : (
            <button {...buttonProps}>Checkout</button>
          )}
        </form>
      </div>
    </>
  );
}
