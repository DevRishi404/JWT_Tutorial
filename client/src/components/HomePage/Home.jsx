import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../redux/slices/ProductsSlice";

const Home = () => {
    const dispatch = useDispatch();

    const { productsList } = useSelector(state => state.products);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        dispatch(getProductsList())
    }, [])

    useEffect(() => {
        if (productsList) {
            setProducts(productsList);
        }
    }, [products])

    return (
        <>
            <h1>Home</h1>
            {
                products.map((x) => <div>{x.title}</div>)
            }
        </>
    )
}

export default Home;