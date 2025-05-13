import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick/lib/slider.js';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/Cart/Cart.jsx';
import { productsContext } from '../../context/Products/Products.jsx';
import { wishlistContext } from '../../context/Wishlist/Wishlist.jsx';

export default function ProductDetails() {
  const { addProduct } = useContext(cartContext);
  const { renderStars } = useContext(productsContext);
  const [ProdDetails, setProdDetails] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  const { id } = useParams();

  const { addToWishlist } = useContext(wishlistContext);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProdDetails(response.data.data);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>{ProdDetails.title}</title>
      </Helmet>

      <div className="container dark:bg-gray-800">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-lg mb-7 dark:bg-gray-700">
              <Slider {...settings}>
                {ProdDetails.images
                  ? ProdDetails.images.map((img, index) => (
                      <div key={index} className="w-full h-[460px]">
                        <img
                          className="w-full h-full object-contain rounded-lg"
                          src={img}
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    ))
                  : ''}
              </Slider>
            </div>
            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => addProduct(ProdDetails.id)}
                className="w-1/2 bg-green-700 hover:bg-green-800 dark:bg-green-600 text-white py-2 px-4 rounded-lg font-bold dark:hover:bg-green-700"
              >
                Add to cart
              </button>
              <button className="w-1/2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => addToWishlist(ProdDetails.id)}
              >
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">
              {ProdDetails.title}
            </h2>

            <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
              Product Description:
            </span>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-5">
              {ProdDetails.description}
            </p>

            <div className="mb-4">
              <div className="flex justify-between my-4">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  Rating
                </div>
                <div className="flex items-center">
                  <span className="flex">
                    {renderStars(Math.round(ProdDetails.ratingsAverage)).map(
                      (star, index) => (
                        <span key={index} className="transform scale-150">
                          {star}
                        </span>
                      )
                    )}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    {ProdDetails.ratingsAverage}
                  </span>
                </div>
              </div>

              <div className="my-5 flex justify-between text-gray-900 dark:text-white">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  Price
                </div>
                <div className="text-xl font-bold">₹{ProdDetails.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
