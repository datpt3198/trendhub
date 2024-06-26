import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import {Select} from 'antd';

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import PCardHorizon from "../../components/cards/PCardHorizon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

function AdminOrders() {
    const [auth, setAuth] = useAuth();

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]);
    const [changedStatus, setChangeStatus] = useState("");
    
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/all-orders");
            setOrders(data)
        } catch (err) {
            console.log(err)
        }
    };

    const handleChangeStatus = async (orderId, value) => {
        setChangeStatus(value);
        try {
            const {data} = await axios.put(`/order-status/${orderId}`, {status: value});
            getOrders();
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = () => {

    }


    return ( 
    <div className="container-fluid">
        <Jumbotron />

        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Đơn hàng</div>
                    <div className="row">
                        {orders?.map((o, index) => {
                            return (
                                <div
                                    key={o._id}
                                    className="border shadow bg-light rounded-4 mb-5"
                                >
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tình trạng</th>
                                                <th scope="col">Ngươi mua</th>
                                                <th scope="col">Đặt hàng từ</th>
                                                <th scope="col">Thanh toán</th>
                                                <th scope="col">Số lượng</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChangeStatus(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s, index) => (
                                                            <Option key={index} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length} sản phẩm</td>
                                                <td>
                                                    <div className="d-inline-flex gap-1">
                                                        <button 
                                                            className="btn btn-primary" 
                                                            type="button" data-bs-toggle="collapse" 
                                                            data-bs-target="#collapseExample" 
                                                            aria-expanded="false" 
                                                            aria-controls="collapseExample"
                                                        >
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        </button>
                                                    </div>    
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                        
                                    </table>

                                    <div className="collapse" id="collapseExample">
                                        <div class="card card-body">
                                            {o?.products?.map((p, index) => 
                                                <PCardHorizon key={index} c={p} remove={false} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminOrders;