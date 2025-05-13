import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const productsContext = createContext(null);

export default function ProductsContextProvider(props) {
  function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-300' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return stars;
  }

  const [searchRes, setSearchRes] = useState(null);

  // Queries
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: (data) => data.data.data,
  });

  function getProducts() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => res);
  }

  async function main() {
    await getProducts();
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <productsContext.Provider
      value={{ data, searchRes, setSearchRes, renderStars }}
    >
      {props.children}
    </productsContext.Provider>
  );
}
