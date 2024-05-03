import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio } from 'antd'

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";
import {prices} from '../prices'

function ShopPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]); 

    useEffect(() => {
        if (!checked.length || !radio.length) loadProducts();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) loadFilterProduct()
    }, [checked, radio])


    useEffect(() => {
        loadCategories();
    }, []);

    const loadProducts = async () => {
        try {
            const { data } = await axios.get('/products')
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    };

    const loadFilterProduct = async () => {
        try {
            const { data } = await axios.post('/filtered-products', {checked, radio})
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories')
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    };

    const handleCheck = (value, id) => {
        let all = [ ...checked ];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }

        setChecked(all);
    };

    return ( 
    <>
        <Jumbotron title="SHOP" subTitle="Welcome to E-comerce" />

        <pre>{JSON.stringify(checked, null, 4)}</pre>

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                        Filter by Categories
                    </h4>
                    <div className="row p-5">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={e => handleCheck(e.target.checked, c._id)} >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                        Filter by Price
                    </h4>
                    <div className="row p-5">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {prices?.map((price) => (
                                <div key={price._id} style={{margin: "8px"}}>
                                    <Radio value={price.array} >
                                        {price.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="p-5 pt-0">
                        <button 
                            className="btn btn-outline-secondary col-12"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                        {products?.length} Products
                    </h4>
                    <div className="row" style={{ height: "80vh", overflow: "scroll" }}>
                        {products?.map((p) => (
                            <div className="col-md-4" key={p._id}>
                                <ProductCard p={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default ShopPage;