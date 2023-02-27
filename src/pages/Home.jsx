import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../states/productsSlicer";
import { ProductBox } from "../components/ProductBox";

export const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    document.title = `Home | Jacket`
  }, []);

  return (
    <div>
      <div className="container pt-4 pb-4">
        <div className="pt-150 pb-150 bg-dark text-light text-center mb-4">
          <h1>Welcom to Jacket</h1>
          <p>The best jacket store online</p>
        </div>
        <h2 className="text-center text-muted mt-5 mb-4">Latest Products</h2>
        {products.length === 0 && (
          <div className="is-loading-bar text-center">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product) => (<ProductBox product={product} key={product.id} />))}
        </div>
      </div>
    </div>
  );
};
