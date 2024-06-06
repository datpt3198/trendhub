import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

function Products() {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products");
            setProducts(data);
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
    <div className="container-fluid">
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Products" />


        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Products</div>

                    {products?.map((p) => {
                        return (
                        <Link
                            key={p._id}
                            to={`/dashboard/admin/product/update/${p.slug}`}
                        >
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                                            alt={p.name}
                                            className="img img-fluid rounded-start"
                                        />
                                    </div>
                                    <div className="col md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{p?.name}</h5>
                                            <p className="card-text">{p?.long_desc.substring(0, 160)}...</p>
                                            <p className="card-text">{`${p.price} $`}</p>
                                            <p className="card-text">Quantity: {p?.quantity}</p>
                                            <p className="card-text">Sold: {p?.sold}</p>
                                            <p className="card-text">{p?.category?.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        )
                        
                    })}
                    
                </div>
            </div>
        </div>
    </div> );
}

export default Products;