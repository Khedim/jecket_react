import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from 'axios'
import { ProductBox } from "../components/ProductBox";

export const Category = () => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const {category_slug} = useParams() 

    useEffect(() => {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(`products/${category_slug}/`)                 
          setCategory(res.data)
          setProducts(res.data.products)
        }catch(e) {console.log(e)}
      }
      fetchCategory()
    }, [category_slug])

    useEffect(() => {
      document.title = `${category.name} | Jacket`
    }, [category])

  return (
    <div>
      <div className="container pt-4 pb-4">
        <h2 className="text-center text-muted mt-5 mb-4">{category.name}</h2>
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
