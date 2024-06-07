import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart'

function ProductCard({ p }) {
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    return ( 
        <div className='card mb-3 hoverable'>
            <Badge.Ribbon text={`${p?.sold} sold`} color='red'>
                <Badge.Ribbon
                    text={p?.quantity >=1 
                        ? `${p?.quantity - p?.sold} in stock` 
                        : "Out of stock"}
                    placement='start'
                    color='green'
                >
                    <img 
                        className='card-img-top m-2 p-2'
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} 
                        alt={p.name}
                        style={{height: "300px", width: "100%", objectFit: "cover"}}
                    />
                </Badge.Ribbon>
            </Badge.Ribbon>

            <div className='card-body'>
                <h5>{p?.name}</h5>

                <h4 className='fw-bold'>
                    {p?.price?.toLocaleString("en-US", {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </h4>

                <p className='card-text'>{p?.long_desc.substring(0, 60)}...</p>
            </div>

            <div className='d-flex justify-content-between'>
                <button 
                    className='btn btn-primary col card-button' 
                    style={{borderBottomLeftRadius: "5px"}}
                    onClick={() => navigate(`/product/${p.slug}`)}
                >
                    Xem sản phẩm
                </button>
                <button 
                    className='btn btn-outline-primary col card-button'
                    style={{borderBottomRightRadius: "5px"}}
                    onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success("Added product in your cart")
                    }}
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
     );
}

export default ProductCard;