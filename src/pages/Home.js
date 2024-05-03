import { useState, useEffect } from "react";
import axios from "axios";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

function Home() {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadProducts();
        getTotal();
    }, []);

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    })

    const getTotal = async () => {
        try {
            const {data} = await axios.get("/products-count");
            setTotal(data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadProducts = async () => {
        try {
            const { data } = await axios.get(`/list-products/${page}`);
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadMore = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`/list-products/${page}`);
            setProducts([...products, ...data]);
            setLoading(false);
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const arr = [...products];
    const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1))

    return ( <div>
        <Jumbotron title="Homepage" subtitle="Welcome to E-commerce!" />

        <div className="row">
            <div className="col-6">
                <h2 className="p-2 mt-2 mb-2 h4 bg-light text-center">
                    New Arrivals
                </h2>
                <div className="row">
                    {products?.map(p => (
                    <div className="col-md-6" key={p._id}>
                        <ProductCard p={p} />
                    </div>
                    ))}
                </div>
            </div>
            <div className="col-6">
                <h2 className="p-2 mt-2 mb-2 h4 bg-light text-center">
                    Best Sellers
                </h2>
                <div className="row">
                    {sortedBySold?.map(p => (
                    <div className="col-md-6 " key={p._id}>
                        <ProductCard p={p} />
                    </div>
                    ))}
                </div>
            </div>

        </div>

        <div className="container text-center p-5">
            {products && products.length < total && (
                <button 
                    className="btn btn-warning btn-lg col-3"
                    disabled={loading}
                    onClick={(e) => {
                        e.defaultPrevented();
                        setPage(page + 1);
                    }}
                >
                    {loading ? "Loading..." : "Load more"}
                </button>
            )}
        </div>
    </div> 
    );
}

export default Home;