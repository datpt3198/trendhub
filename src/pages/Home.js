import { useState, useEffect } from "react";
import axios from "axios";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import CategoryCard from "../components/cards/Category";

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState(3);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (total <= 3 && loading === false) return
        loadMore();
    })

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get(`/products`);
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    };

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories');
            setCategories(data);
        } catch (err) {
            console.log(err)
        }
    }

    const loadMore = async () => {
        try {
            if (loading === true) {
                setTotal(99)
            }
            loadProducts();
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const arr = [...products];
    const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1))
    return ( 
    <div className="container-fluid">
        {/* Banner */}
        <Jumbotron title="Homepage" subtitle="Welcome to E-commerce!" />

        <div className="container">
            <div className="col">
                {/* Category List */}
                <div className="col-12 border rounded mt-4">
                    <div 
                        className="bg-primary"
                        style={{width: "300px", margin: "0 auto", borderRadius: "30px", color: "#fff"}}
                    >
                        <h2 className="p-2 mt-4 mb-4 h4 text-center">
                            Popular Categories
                        </h2>
                    </div>
                    <div className="row">
                        {categories?.map(c => (
                        <div className="col-md-3" key={c._id}>
                            <CategoryCard c={c} />
                        </div>
                        ))}
                    </div>
                </div>
                {/* New arrival list */}
                <div className="col-12 border rounded p-3 mt-4 bg-warning">
                    <div 
                        className="bg-primary col-3 text-light"
                        style={{borderRadius: "30px"}}
                    >
                        <h2 className="p-2 mt-2 mb-4 h4 text-center">
                            New Arrivals
                        </h2>
                    </div>
                    <div className="row">
                        {products?.map((p, i) => {
                            if (i <= total)  {
                                return (
                                <div className="col-md-3" key={p._id}>
                                    <ProductCard p={p} />
                                </div>)
                            } else return
                        })}
                    </div>
                    <div className="container text-center p-5">
                        {(products && loading !== true) ? (
                            <button 
                                className={`btn btn-light btn-lg col-3 `}
                                onClick={() => setLoading(!loading)}
                            >
                                See all products
                            </button>
                        ) : <></>}
                    </div>
                </div>
                {/* Best seller list */}
                <div className="col-12 border rounded p-3 mt-4 bg-success bg-gradient">
                    <div 
                        className="bg-primary col-3 text-light"
                        style={{borderRadius: "30px"}}
                    >
                        <h2 className="p-2 mt-2 mb-4 h4 text-center">
                            Best Sellers
                        </h2>
                    </div>
                    <div className="row mt-2">
                        {sortedBySold?.map((p, i) => {
                            if( i <= total ) {
                                return (
                                    <div className="col-md-3 " key={p._id}>
                                        <ProductCard p={p} />
                                    </div>
                                )
                            } else return
                        })}
                    </div>
                    <div className="container text-center p-5">
                        {(products && loading !== true) ? (
                            <button 
                                className="btn btn-warning btn-lg col-3"
                                disabled={loading}
                                onClick={() => {
                                    setLoading(!loading)
                                }}
                            >
                                See all products
                            </button>
                        ) : <></>}
                    </div>
                </div>
            </div>
        </div>
    </div> 
    );
}

export default Home;