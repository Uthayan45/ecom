import { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import Spinner from '../../components/Spinner/Spinner';
import { cartContext } from '../../context/Cart/Cart';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { getWishlist, deleteWishlistItem } = useContext(wishlistContext);
  const { addProduct } = useContext(cartContext);
  const [wishlistProducts, setWishlistProducts] = useState(null);

  async function fetchGetWishlist() {
    const products = await getWishlist();
    setWishlistProducts(products);
  }

  async function fetchDeleteProduct(id) {
    await deleteWishlistItem(id);
    fetchGetWishlist();
  }

  useEffect(() => {
    fetchGetWishlist();
  }, []);

  return (
    <>
      <div className="container flex flex-wrap">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistProducts ? (
                wishlistProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center text-xl h-20 font-bold md:text-2xl lg:text-3xl"
                    >
                      <i className="fas fa-box-open me-3"></i>
                      Wow, such empty!
                    </td>
                  </tr>
                ) : (
                  wishlistProducts?.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                            alt={product.title}
                          />
                        </Link>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link
                          to={`/product/${product._id}`}
                          className="hover:underline"
                        >
                          {product.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-3">
                          <button
                            href="#"
                            onClick={() => addProduct(product._id)}
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <i className="fas fa-cart-plus me-2"></i>
                            <span className="hidden md:inline">
                              Add to cart
                            </span>
                          </button>

                          <button
                            onClick={() => fetchDeleteProduct(product._id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" className="py-4">
                    <div>
                      <Spinner />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
