import { Link } from 'react-router-dom'

export const ProductBox = (props) => {
    const {product} = props
    return <div className="col" key={product.id}>
    <div className="card" style={{ width: "18rem;" }}>
      <img
        src={product.get_thumbnail}
        style={{ height: "250px" }}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <Link
          to={`/products${product.get_absolute_url}`}
          className="btn btn-dark"
        >
          View detail
        </Link>
      </div>
    </div>
  </div>
} 