import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';
import toast from 'react-hot-toast';

import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";

function UserCartSidebar() {
    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    // state
    const [clientToken, setClientToken] = useState('');
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    // hooks
    const navigate = useNavigate(); 

    useEffect(() => {
        if (auth?.token) {
            getClientToken()
        }
    });

    const getClientToken = async () => {
        try {
            const {data} = await axios.get("/braintree/token");
            setClientToken(data.clientToken)
        } catch (err) {
            console.log(err)
        }
    };

    const cartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    };

    const handleBuy = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart
            });
    
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/oders");
            toast.success('Payment successful')

        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div className='col-md-4'>
            <h4>Your cart summary</h4>
                Total / Address / Payments
            <hr />
            <h6>Total: {cartTotal()}</h6>

            {auth?.user?.address ? (
                <>
                    <div className='mb-3'>
                        <hr />
                        <h4>Address:</h4>
                        <h5>{auth?.user?.address}</h5>
                    </div>
                    <button className='btn btn-outline-warning'>
                                Update address
                    </button>
                </>) : (
                <div className='mb-3'>
                    {auth?.token ? (
                        <button
                            className='btn btn-outline-warning'
                            onClick={() => navigate("/dashboard/user/profile")}
                        >
                            Add delivery address
                        </button>
                    ) : (
                        <button
                            className='btn btn-outline-danger mt-3'
                            onClick={() => navigate("/login", {
                            state: "/cart",
                            })}
                        >
                            Login to checkout
                        </button>
                    )}
                </div>
            )}

            <div>
                {!clientToken || !cart?.length ? ("") : (
                    <>
                        <DropIn 
                            options={{
                                authorization: clientToken,
                                paypal: {
                                    flow: "vault"
                                }
                            }}
                            onInstance={(instance) => setInstance(instance)}
                        />
                        <button 
                            className="btn btn-primary col-12 mt-2" 
                            onClick={handleBuy}
                            disabled={!auth?.user?.address || !instance || loading}
                        >
                            {loading ? "Processing..." : "Buy"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserCartSidebar;
