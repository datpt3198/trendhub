import { Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../context/cart'

function PCardShop({ p }) {
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    return ( 
        <div className='card mb-3 hoverable rounded '>
           <div className='row'>
                <div className='col-4'>
                    <img 
                        className='card-img-top m-2 p-2'
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} 
                        alt={p.name}
                        style={{height: "300px", width: "100%", objectFit: "cover"}}
                    />
                </div>
    
                <div className='card-body col-8'>
                    <h5>{p?.name}</h5>
                    <h4 className='fw-bold'>
                        {p?.price?.toLocaleString("en-US", {
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </h4>

                    {p?.short_desc.map((sd, i) => {
                       return <p className='card-text' key={i} >{sd}</p>
                    })}
    
                    <div className='d-flex justify-content-between my-5 mx-3'>
                        <Link to={`/product/${p.slug}`} className='text-primary'>View Product</Link>
                        
                        <Link 
                            className='text-primary'
                            onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                toast.success("Added product in your cart")
                            }}>Add to Cart</Link>
                       
                    </div>
                </div>
           </div>
        </div>
     );
}

export default PCardShop;