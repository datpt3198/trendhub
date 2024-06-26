import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Modal } from 'antd';

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import CategoryForm from "../../components/forms/Category";

function AdminCategory() {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("")
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");


    useEffect(() => {
        loadCategories();
    }, []);

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
        try {
            const categoryData = new FormData();
            categoryData.append("name", name);
            categoryData.append("photo", photo );

            const { data } = await axios.post('/category', categoryData);
            console.log("Data => ", data)

            
            if(data?.error) {
                toast.error(data.error)
            } else {
                loadCategories();
                setName("");
                setPhoto("");
                toast.success(`"${data.name}" is created`);
            }
        } catch (err) {
            console.log(err);
            toast.error("Create category failed. Try again!");
        }
    };

    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.put(`/category/${selected._id}`, {name: updatingName});
    //         if(data?.error) {
    //             toast.error(data.error)
    //         } else {
    //             setSelected(null);
    //             setUpdatingName("");
    //             toast.success(`"${data.name}" is updated`);
    //             loadCategories();
    //             setVisible(false)
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         toast.error('Category may already exist. Try again!')
    //     }
    // };

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.delete(`/category/${selected._id}`);
    //         if(data?.error) {
    //             toast.error(data.error)
    //         } else {
    //             toast.success(`"${data.name}" is deleted`);
    //             setSelected(null);
    //             loadCategories();
    //             setVisible(false);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         toast.error('Category may already exist. Try again!')
    //     }
    // };

    return ( 
    <div className="container-fluid">
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard" />


        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Quản lý danh mục sản phẩm</div>
                    
                    <CategoryForm 
                        value={name}
                        setValue={setName}
                        photo={photo}
                        setPhoto={setPhoto}
                        handleSubmit={handleSubmit}
                    />

                    <hr />

                    {/* <div className="d-flex">
                            {categories?.map((c) => (
                                    <button 
                                        key={c._id} 
                                        className="btn btn-outline-primary m-3" 
                                        onClick={() => {
                                          setVisible(true);
                                          setSelected(c);
                                          setUpdatingName(c.name);
                                    }}>
                                        {c.name}
                                    </button>
                            ))}
                    </div> */}

                    {/* <Modal 
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        footer={null}
                    >
                        <CategoryForm 
                            value={updatingName}
                            setValue={setUpdatingName}
                            handleSubmit={handleUpdate}
                            buttonText="Update"
                            handleDelete={handleDelete}
                        />
                    </Modal> */}
                </div>
            </div>
        </div>
    </div> );
}

export default AdminCategory;