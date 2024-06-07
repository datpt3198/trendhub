import { useState, useEffect } from "react";
import axios from "axios";
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

const { Option } = Select;

function ProductUpdate() {

    const [auth, setAuth] = useAuth();

    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("")

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadProduct();
    }, [])

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

    const loadProduct = async () => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setCategory(data.category._id);
            setShipping(data.shipping);
            setQuantity(data.quantity);
            setId(data._id);
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            photo && productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("quantity", quantity);

            const { data } = await axios.put(`/product/${id}`, productData)

            if(data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" is update`);
                navigate("/dashboard/admin/products")
            }
        } catch (err) {
            console.log(err);
            toast.error("Product updated fail. Try again!");
        }
    }

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm(
                "Are you sure delete this product?"
            );

            if (!answer) return;

            const { data } = await axios.delete(`/product/${id}`)
            toast.success(`"${data.name}" is deleted`);
            navigate("/dashboard/admin/products")
        } catch (err) {
            console.log(err);
            toast.error("Delete fail. Try again!");
        }
    }

    return ( 
        <div className="container-fluid">
            <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard" />


            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Cập nhật sản phẩm</div>

                        {photo ? (
                            <div className="text-center">
                                <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt="preview"
                                    className="img img-reponsive"
                                    height="200px"
                                />    
                            </div>
                        ) : (
                            <div className="text-center">
                                <img 
                                    src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`} 
                                    alt="preview"
                                    className="img img-reponsive"
                                    height="200px"
                                /> 
                            </div>
                        )}

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
                        
                        <textarea 
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Write a description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input 
                            type="number"
                            className="form-control p-2 mb-3"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Select
                            showSearch
                            bordered={false}
                            size="large"
                            className="form-select mb-3"
                            placeholder="Choose category"
                            onChange={(value) => setCategory(value) }
                            value={category}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id} >
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            size="large"
                            className="form-select mb-3"
                            placeholder="Choose shipping"
                            onChange={(value) => setShipping(value) }
                            value={shipping ? "Yes" : "No"}
                        >
                            <Option value="0" >Không</Option>
                            <Option value="1" >Có</Option>
                        </Select>

                        <input 
                            type="number"
                            min="1"
                            className="form-control p-2 mb-3"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <div className="d-flex justify-content-between">
                            <button onClick={handleSubmit} className="btn btn-primary mb-5" >Cập nhật</button>
                            <button onClick={handleDelete} className="btn btn-danger mb-5" >Xóa</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
     );
}

export default ProductUpdate;