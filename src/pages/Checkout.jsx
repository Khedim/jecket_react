import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart.items);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    place: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const totalCart = cart.reduce((ac, cur) => {
    return (ac += cur.quantity * cur.price);
  }, 0);

  const totalItems = cart.reduce((ac, cur) => {
    return (ac += cur.quantity);
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors([]);
    if (formData.firstName === "") {
      setFormErrors((pre) => [...pre, "The first name is missing"]);
    }
    if (formData.lastName === "") {
      setFormErrors((pre) => [...pre, "The last name is missing"]);
    }
    if (formData.email === "") {
      setFormErrors((pre) => [...pre, "The email is missing"]);
    }
    if (formData.phone === "") {
      setFormErrors((pre) => [...pre, "The phone is missing"]);
    }
    if (formData.address === "") {
      setFormErrors((pre) => [...pre, "The address is missing"]);
    }
    if (formData.zipCode === "") {
      setFormErrors((pre) => [...pre, "The zip code is missing"]);
    }
    if (!formErrors.length) {
          // proceed to stripe payment
    }
  };

  useEffect(() => {
    document.title = `Checkout | Jacket`;
  }, []);

  return (
    <div className="container pt-4 pb-4">
      <h1 className="mb-4">Checkout</h1>
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
                  <td>{item.quantity} </td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="fs-4">Total</td>
                <td></td>
                <td>{totalItems} items</td>
                <td>${totalCart.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="summry p-4 mt-5">
            <h6>Shipping detail</h6>
            <p>* All fields are required</p>
            <form className="pb-2 row" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="firt-name" className="form-label">
                    First name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="firt-name"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastt-name" className="form-label">
                    Last name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="lastt-name"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone*
                  </label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip-code" className="form-label">
                    Zip code*
                  </label>
                  <input
                    type="number"
                    name="zipCode"
                    className="form-control"
                    id="zip-code"
                    placeholder="Zip code"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip-code" className="form-label">
                    Place*
                  </label>
                  <input
                    type="text"
                    name="place"
                    className="form-control"
                    id="place"
                    placeholder="Place"
                    value={formData.place}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {formErrors.length > 0 && (
                <div className="bg-danger bg-opacity-25 p-1 text-danger border border-danger rounded mb-3 ps-3">
                  {formErrors.map((err) => (
                    <p className="p-0 m-0" key={err}>
                      {err}
                    </p>
                  ))}
                </div>
              )}
              <div id="card-element" className="mb-2"></div>
              <hr />
              <button className="btn btn-dark mt-2 col-4 col-md-3">
                Pay with stripe
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
