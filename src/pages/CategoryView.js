import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

function CategoryView() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const navigate =useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProductsByCategory();
    }, [params?.slug])

    const loadProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`/products-by-category/${params.slug}`);
            setProducts(data.products);
            setCategory(data.category)
        } catch (err) {
            console.log(err)
        }
    };

    return ( 
    <div className="container-fluid">
        <div className="container">
            <div className="d-flex m-2">
                <div className='d-flex justify-content-around align-items-center'>
                    <FontAwesomeIcon icon={faHouse}  className='me-2'/>
                    <Link className='m-0 text-link' to={'/'} >Trang chủ</Link>
                </div>
                <span className='m-2'>
                    {`>`}
                </span>
                <p className="my-2">{params.slug}</p>
            </div>
        </div>
        <Jumbotron/>
        <div className="container">
            <div className="row mt-3">
                {products?.map(p => (
                    <div key={p._id} className="col-md-4">
                        <ProductCard p={p} />
                    </div>
                ))}
            </div>
        </div>
    </div> );
}

export default CategoryView;