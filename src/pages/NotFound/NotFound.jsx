import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-green-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <Link
            to="/"
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Take me home
            </a>
            <a
              href="#"
              onClick={handleGoBack}
              className="text-sm font-semibold text-gray-900"
            >
              Go back <span aria-hidden="true">→</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
