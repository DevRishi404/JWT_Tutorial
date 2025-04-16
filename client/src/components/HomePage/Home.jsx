import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../redux/slices/ProductsSlice";
import { Button } from "@mui/material";
import { logoutUser } from "../../redux/slices/AuthSlice";

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
    }, [productsList])

    const handleLogout = () => { 
        dispatch(logoutUser());
    }

    return (
        <>
            <h1>Home</h1>
            {
                products.map((x) => <div>{x.name}</div>)
            }
            <Button variant="contained" onClick={handleLogout}> Logout </Button>
        </>
    )
}

export default Home;