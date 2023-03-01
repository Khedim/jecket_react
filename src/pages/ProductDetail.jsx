import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/cartSlicer";

export const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setquantity] = useState(1);
  const { category_slug, product_slug } = useParams();
  const dispatch = useDispatch();

  // Toast
  const [showToast, setShowToast] = useState(false);
  const toast = (
    <div className="custom-toast">
      <p>The Product was added to the cart</p>
    </div>
  );

  const hadleToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `products/${category_slug}/${product_slug}/`
        );
        setProduct(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [category_slug, product_slug]);

  useEffect(() => {
    document.title = `${product.name} | Jacket`;
  }, [product]);

  return (
    <>
      <div className="container pt-5 pb-5">
        {!product.id && (
          <div className="is-loading-bar text-center">
            <div className="lds-dual-ring"></div>
          </div>
        )}
        <div className="row">
          <div className="col-md-9 col-sm-12">
            <img
              src={product.get_image}
              alt={product.name}
              style={{ maxHeight: "calc(100vh - 80px)", maxWidth: "100%" }}
            />
          </div>
          <div className="col-md-3 col-sm-12 pt-4">
            <h2 className="mb-4 fs-1">{product.name}</h2>
            <p className="fs-5">{product.description}</p>
            <p>
              <strong>Price : </strong>${product.price}
            </p>
            <div className="d-flex aline-center mt-5">
              <input
                type="number"
                onChange={(event) => setquantity(event.target.value)}
                value={quantity}
                min="1"
                className="w-50 p-2"
              />
              <button
                className="bg-dark text-light w-50"
                onClick={() => {
                  dispatch(addToCart({ ...product, quantity: parseInt(quantity) }));
                  hadleToast();
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        {showToast && toast}
      </div>
    </>
  );
};
