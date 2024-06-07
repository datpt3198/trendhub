import { useNavigate } from 'react-router-dom'

import { useCart } from '../context/cart';
import { useAuth } from '../context/auth'
import Jumbotron from '../components/cards/Jumbotron'
import UserCartSidebar from '../components/cards/UserCartSidebar';
import PCardHorizon from '../components/cards/PCardHorizon';

function Cart() {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();

    return ( 
    <>
        <Jumbotron />

        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className='p-3 mt-2 mb-2 bg-light text-center'>
                        {cart?.length ? (
                            "Your cart"
                            ) : (
                            <div className='text-center'>
                                <p>Không có sản phẩm nào hiện tại!</p>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => navigate("/")}
                                >
                                    Đến mua ngay
                                </button>
                            </div>
                            )}
                    </h4>
                </div>
            </div>
        </div>

        {cart?.length && (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='row'>
                            {cart?.map((c, index) => (
                                <PCardHorizon c={c} key={index} />
                            ))}
                        </div>
                    </div>
                    <UserCartSidebar />
                </div>
            </div>
        )}
    </> 
);
}

export default Cart;