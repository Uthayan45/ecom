import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import Slider from 'react-slick';
import Spinner from '../Spinner/Spinner';

export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container my-10">
      <h3 className="text-3xl font-medium mb-5">Popular Categories</h3>
      {data ? (
        <>
          <Slider {...settings}>
            {data.map((category) => (
              <div
                key={category._id}
                className="rounded-lg px-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-lg hover:shadow-green-300 transition-shadow shadow-md object-cover object-top w-full h-80"
                  src={category.image}
                  alt={category.name}
                />
                <div className="text-center">
                  <a href="#">
                    <h3 className="text-gray-900 mt-2 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-xl tracking-tight dark:text-white">
                      {category.name}
                    </h3>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
