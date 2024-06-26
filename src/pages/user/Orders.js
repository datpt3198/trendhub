import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import PCardHorizon from "../../components/cards/PCardHorizon";

function UserOrders() {
    const [auth, setAuth] = useAuth();

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/orders");
            setOrders(data)
        } catch (err) {
            console.log(err)
        }
    }


    return ( 
    <div>
        <Jumbotron 
            title={`Hello ${auth?.user?.name}`} 
            subtitle="Admin Dashboard" 
        />

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Đơn hàng của bạn</div>
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
                                                <th scope="col">Người mua</th>
                                                <th scope="col">Dặt hàng từ</th>
                                                <th scope="col">Thanh toán</th>
                                                <th scope="col">Số lượng</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{index ++}</td>
                                                <td>{o?.status}</td>
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

                                    <div className="container">
                                        <div className="row m-2">
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

export default UserOrders;