import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors([]);
    if (formData.username === '') {
        setFormErrors(pre => [...pre, 'The username is missing'])
    }
    if (formData.password.length < 8) {
        setFormErrors(pre => [...pre, 'Password is too short'])
    }
    if (formData.password !== formData.password2) {
        setFormErrors(pre => [...pre, 'The Passwords doesn\'t match'])
    }
    if (!formErrors.length) {
        axios
            .post('users/', formData)
            .then(res => {
                navigate('/log-in')
            })
            .catch(err => {
                if (err.response) {
                    for (const property in err.response.data) {
                        setFormErrors(pre => [...pre, `${property}: ${err.response.data[property]}`])
                    }
                    console.log(JSON.stringify(err.response.data))
                }else if (err.message) {
                    setFormErrors(pre => [...pre, 'Something went wrong. Please try again'])
                    console.log(JSON.stringify(err))
                }
            })
    }
  };

  useEffect(() => {
    document.title = `Sign up | Jacket`
  }, [])

  return (
    <div className="container p-4 mb-5">
      <div className="row justify-content-center mt-5  px-sm-4">
        <div className="col-md-6 col-lg-4 rounded shadow pt-4 pb-2">
          <h2 className="mb-3">Sign up</h2>
          <form className="pb-2" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                name="password2"
                className="form-control"
                id="password2"
                placeholder="Repeat password"
                value={formData.password2}
                onChange={handleChange}
              />
            </div>
            {formErrors.length > 0 && (
              <div className="bg-danger bg-opacity-25 p-1 text-danger border border-danger rounded mb-3">
                {formErrors.map((err) => (
                  <p className="p-0 m-0" key={err}>
                    {err}
                  </p>
                ))}
              </div>
            )}
            <button type="submit" className="btn btn-dark">
              Sign up
            </button>
          </form>
          <hr />
          <p className="fs-6">
            Or click <Link to="/log-in">here</Link> to log in
          </p>
        </div>
      </div>
    </div>
  );
};
