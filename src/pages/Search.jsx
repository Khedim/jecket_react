import axios from "axios";
import { useEffect, useState } from "react";
import { ProductBox } from "../components/ProductBox";

export const Search = () => {
  const [products, setProducts] = useState([]);
  const queryParams = new URLSearchParams(window.location.search.substring(1));
  const query = queryParams.get('query') || '';

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await axios.get(
          "products/search/", {
            params: {
              query
            }
          });
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSearch();
  }, [query]);

  return (
    <div className="container pt-4 pb-4">
      <h1>Search</h1>
      <p>
        Search term : <span>"{query}"</span>
      </p>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product) => (<ProductBox product={product} key={product.id} />))}
        </div>
    </div>
  );
};
