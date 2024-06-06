import moment from 'moment';
import { useCart } from '../../context/cart';


function PCardHorizon({ c, remove = true }) {
    const [cart, setCart] = useCart();

    const removeFromCart = (productId) => {
        let myCart = [...cart]
        let index = myCart.findIndex((item) => item._id === productId);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.getItem('cart', JSON.stringify(myCart))
    }

    return ( 
        <div 
            className='card mb-3'
        >
            <div className='row g-0'>
                <div className='col-md-4'>
                    <img 
                        src={`${process.env.REACT_APP_API}/product/photo/${c._id}`}
                        alt={c.name}
                        style={{
                            height: '200px',
                            width: '200px',
                            objectFit: 'cover',
                            marginLeft: '-12px',
                            borderTopRightRadius: '0px'
                        }}
                    />
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {c.name}
                        </h5>
                        <h4>
                            {c?.price?.toLocaleString("en-US", {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </h4>
                        <p className='card-text'>{`${c?.long_desc?.substring(0, 120)}...`}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <p className='card-text'>
                        <small className='text-muted'>
                            Listed {moment(c.createdAt).fromNow()}
                        </small>
                    </p>
                    {remove && (
                        <p 
                            className='text-danger mb-2 pointer'
                            onClick={() => removeFromCart(c._id)}
                        >
                            Remove
                        </p>
                    )}
                </div>
            </div>
        </div>
     );
}

export default PCardHorizon;