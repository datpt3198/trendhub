import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

const { Option } = Select;

function AdminProduct() {
    const [auth, setAuth] = useAuth();

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [short, setShort] = useState([]);
    const [long, setLong] = useState("");
    
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("short", short)
        try {
            const productData = new FormData();
            productData.append("photo", photo);
            productData.append("name", name);
            productData.append("long_desc", long);
            productData.append("short_desc", short);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("quantity", quantity);

            const { data } = await axios.post("/product", productData);

            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is create`);
                navigate("/dashboard/admin/products")
            }
        } catch (err) {
            console.log(err)
            toast.error("Product created fail. Try again")
        }
    }

    return ( 
    <div className="conatiner-fluid">
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard" />


        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Create product</div>

                    {photo &&
                        <div className="text-center">
                            <img 
                                src={URL.createObjectURL(photo)} 
                                alt="photo preview"
                                className="img img-reponsive"
                                height="200px"
                            />
                        </div>}

                    <div className="pt-2">
                        <label className="btn btn-outline-secondary col-12 mb-3">
                            {photo ? photo.name : "Upload photo"}

                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={e => setPhoto(e.target.files[0])}
                                hidden
                            />
                        </label>
                    </div>

                    <input 
                        type="text"
                        className="form-control p-2 mb-3"
                        placeholder="Write a name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Select
                        showSearch
                        bordered={false}
                        size="large"
                        className="form-select mb-3"
                        placeholder="Choose category"
                        onChange={(value) => setCategory(value) }
                    >
                        {categories?.map((c) => (
                            <Option key={c._id} value={c._id} >
                                {c.name}
                            </Option>
                        ))}
                    </Select>

                    {category ? (
                        <div>
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                            <input 
                                type="text"
                                className="form-control p-2 mb-3"
                                onChange={e => setShort([...short, (e.target.value)])}
                            />
                        </div>
                        ) : ""}
                    
                    <textarea 
                        type="text"
                        className="form-control p-2 mb-3"
                        placeholder="Write a description"
                        value={long}
                        onChange={(e) => setLong(e.target.value)}
                    />

                    <input 
                        type="number"
                        className="form-control p-2 mb-3"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    

                    <Select
                        bordered={false}
                        size="large"
                        className="form-select mb-3"
                        placeholder="Choose shipping"
                        onChange={(value) => setShipping(value) }
                    >
                        <Option value="0" >No</Option>
                        <Option value="1" >Yes</Option>
                    </Select>

                    <input 
                        type="number"
                        min="1"
                        className="form-control p-2 mb-3"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <button onClick={handleSubmit} className="btn btn-primary mb-5" >Submit</button>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminProduct;