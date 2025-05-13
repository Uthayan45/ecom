import { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import Spinner from '../../components/Spinner/Spinner';
import ProductItem from '../../components/ProductItem/ProductItem';
import { productsContext } from '../../context/Products/Products';

export default function Search() {
  const { searchRes } = useContext(productsContext);

  const { getWishlist, addToWishlist, deleteWishlistItem } =
    useContext(wishlistContext);

  const [wishlistIds, setWishlistIds] = useState(null);

  async function handleWishlist(id) {
    if (wishlistIds?.indexOf(id) !== -1) {
      await deleteWishlistItem(id);
    } else {
      await addToWishlist(id);
    }
    main();
  }

  async function main() {
    const wishlistItems = await getWishlist();
    const ids = wishlistItems.map((item) => item._id);
    setWishlistIds(ids);
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <div className="container flex flex-wrap items-center">
        <h3 className="text-3xl font-medium mb-5 w-full">Search Results:</h3>
        {searchRes ? (
          searchRes.map((product) => (
            <ProductItem
              product={product}
              isWished={wishlistIds?.indexOf(product._id) !== -1 ? true : false}
              key={product._id}
              handleWishlist={handleWishlist}
            />
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
