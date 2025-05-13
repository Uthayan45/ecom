import { useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {
  // Queries
  const { data } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  async function getBrands() {
    const URL = 'https://ecommerce.routemisr.com/api/v1/brands';

    return axios
      .get(URL)
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  async function main() {
    await getBrands();
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <div className="container flex flex-wrap items-center">
        <h3 className="text-3xl font-medium mb-5 w-full">Our Brands</h3>
        {data ? (
          data.map((brand) => (
            <div
              className="w-full lg:md:w-1/4 md:w-1/3 sm:w-1/2 mx-auto p-3"
              key={brand._id}
            >
              <div className="relative bg-white mx-auto transition-shadow hover:shadow-green-300 shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <img
                    className="rounded-lg mx-auto"
                    src={brand.image}
                    alt={brand.name}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
