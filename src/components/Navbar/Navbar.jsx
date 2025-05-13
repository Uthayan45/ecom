import logo from '../../assets/freshcart-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { authContext } from '../../context/Auth/Auth';
import { initFlowbite } from 'flowbite';
import { productsContext } from '../../context/Products/Products';
import Search from '../../pages/Search/Search';

export default function Navbar() {
  const { userToken, setUserToken } = useContext(authContext);
  const location = useLocation();

  const { data, setSearchRes, searchRes } = useContext(productsContext);

  function logout() {
    setUserToken(null);
    localStorage.removeItem('authToken');
  }

  const navigate = useNavigate();
  function handleSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value;

      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase().trim())
      );

      setSearchRes(filteredProducts);
      navigate('/search');
    }
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0 lg:dark:text-green-500'
      : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700';
  };

  return (
    <>
      <nav className="bg-white border-gray-200 shadow-md dark:bg-gray-900 fixed top-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Freshcart Logo" />
          </Link>
          <div className="flex lg:order-2">
            {userToken ? (
              <>
                <button
                  type="button"
                  data-collapse-toggle="navbar-search"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                  className="lg:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
                <div className="relative hidden lg:block">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    onKeyUp={(e) => handleSearch(e)}
                    id="search-navbar"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Search..."
                  />
                </div>
              </>
            ) : (
              ''
            )}
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-search"
          >
            {userToken ? (
              <div className="relative mt-3 lg:hidden">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  onKeyUp={(e) => handleSearch(e)}
                  id="search-navbar"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Search..."
                />
              </div>
            ) : (
              ''
            )}
            <ul
              className={`flex flex-col p-4 lg:p-0 mt-4 ${
                userToken ? '' : 'mr-40'
              } w-full  font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700`}
            >
              {userToken ? (
                <>
                  {' '}
                  <li>
                    <Link
                      to="/"
                      className={getLinkClass('/')}
                      aria-current="page"
                    >
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-home fa-fw"></i>
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="wishlist" className={getLinkClass('/wishlist')}>
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-heart fa-fw"></i>
                        <span>Wishlist</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="cart" className={getLinkClass('/cart')}>
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-cart-shopping fa-fw"></i>
                        <span>Cart</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="brands" className={getLinkClass('/brands')}>
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fa-solid fa-tags" />
                        <span>Brands</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="categories"
                      className={getLinkClass('/categories')}
                    >
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fa-solid fa-list" />
                        <span>Categories</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="login"
                      onClick={logout}
                      className={getLinkClass('/login')}
                    >
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-arrow-right-from-bracket fa-fw"></i>
                        <span>Logout</span>
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="login" className={getLinkClass('/login')}>
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-sign-in-alt fa-fw"></i>
                        <span>Login</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="register" className={getLinkClass('/register')}>
                      <div className="flex lg:flex-col lg:justify-center items-center space-x-1">
                        <i className="fas fa-user-plus fa-fw"></i>
                        <span>Register</span>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
