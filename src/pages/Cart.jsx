import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, minus, removeFromCart } from "../states/cartSlicer";
import Swal from "sweetalert2";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.cart.items);
  const dispatch = useDispatch();

  console.log(cart)

  const handleDelete = (item, isTrue) => {
    if (isTrue || item.quantity === 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this item from your cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
        buttonsStyling: false,
        cancelButtonColor: "#212529",
        customClass: {
          confirmButton: "btn btn-danger me-2",
          cancelButton: "btn btn-dark ms-2",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFromCart(item));
          Swal.fire(
            "Removed!",
            "The item has been removed from your cart.",
            "success"
          );
        }
      });
    } else if (item.quantity > 1) {
      dispatch(minus(item));
    }
  };

  const totalCart = cart.reduce((p, c) => {
    return (p += c.price * c.quantity);
  }, 0);

  const totalItems = cart.reduce((p, c) => {
    return (p += c.quantity);
  }, 0);

  return (
    <div className="container pt-4 pb-4">
      <h1 className="mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>You have no items in the cart</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr className="tr-remove" key={item.id}>
                  <td>
                    <Link to={`/products${item.get_absolute_url}`}>
                      <img
                        src={item.get_thumbnail}
                        alt={item.name}
                        className="cart-image"
                      />
                    </Link>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    {item.quantity}{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch(addToCart({ ...item, quantity: 1 }))
                      }
                    >
                      +
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDelete(item, false)}
                    >
                      {" "}
                      -
                    </span>
                  </td>
                  <td>{(item.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="bg-danger text-light border-0 rounded-circle pl-3 pr-3"
                      onClick={() => handleDelete(item, true)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summry p-4 mt-5">
            <h2>Summary</h2>
            <p>
              <strong>${totalCart.toFixed(2)} ;</strong> {totalItems} items
            </p>
            <hr />
            <div className="btn btn-dark">Proceed to checkout</div>
          </div>
        </>
      )}
    </div>
  );
};
