import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/Cart/Cart';
import { productsContext } from '../../context/Products/Products';

export default function ProductItem({ product, isWished, handleWishlist }) {
  const { addProduct } = useContext(cartContext);
  const { renderStars } = useContext(productsContext);
  return (
    <div className="w-full lg:md:w-1/4 md:w-1/3 sm:w-1/2 p-3">
      <div className="relative bg-white mx-auto hover:scale-105 transition-all duration-400 hover:shadow-green-300 shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="text-right absolute top-3 left-3">
          <button
            onClick={() => handleWishlist(product._id)}
            className="p-2 rounded-full bg-green-500 bg-opacity-25 hover:bg-opacity-50"
          >
            {isWished ? (
              <i className="fas fa-heart fa-fw fa-lg text-green-600"></i>
            ) : (
              <i className="far fa-heart fa-fw fa-lg text-green-600"></i>
            )}
          </button>
        </div>

        <Link to={`product/${product._id}`}>
          <img
            className="rounded-t-lg"
            src={product.imageCover}
            alt={product.title}
            loading="lazy"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`product/${product._id}`} className="hover:underline">
            <h3 className="text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-xl tracking-tight dark:text-white">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-2.5 mb-5">
            <span className="flex">
              {renderStars(Math.round(product.ratingsAverage))}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {product.ratingsAverage}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="md:text-xl text-2xl font-bold text-gray-900 dark:text-white">
              ₹{product.price}
            </span>
            <button
              href="#"
              onClick={() => addProduct(product._id)}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
