import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../states/products"

export const Home = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    console.log(products)

    return <div>
        {products.map(product => <h2 key={product.id}>{product.name}</h2>)}
    </div>
}