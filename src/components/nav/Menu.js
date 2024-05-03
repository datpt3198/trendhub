import { NavLink, useNavigate } from 'react-router-dom';
import { Badge } from 'antd'

import { useAuth } from '../../context/auth';
import Search from '../forms/Search';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';

function Menu() {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const navigate = useNavigate();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate('/login')
    }

    return ( 
    <>
        <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                    HOME
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/shop">
                    SHOP
                </NavLink>
            </li>

            <div className='dropdown'>
                <buton 
                    className='nav-link pointer dropdown-toggle' 
                    data-bs-toggle="dropdown"
                >
                    CATEGORIES
                </buton>

                <ul className='dropdown-menu' style={{height: "300px", overflow: "scroll"}}>
                    <li>
                        <NavLink className='nav-link' to="/categories">
                            All Categories
                        </NavLink>
                    </li>
                        {categories?.map((c) => (
                    <li key={c._id}>
                        <NavLink className='nav-link' to={`/category/${c.slug}`}>
                            {c.name}
                        </NavLink>
                    </li>
                    ))}
                </ul>

            </div>

            <li className="nav-item">
                <Badge 
                    count={cart?.length >=1 ? cart.length : 0} 
                    offset={[0, 10]}
                    showZero={true}
                >
                    <NavLink className="nav-link" aria-current="page" to="/cart">
                        CART
                    </NavLink>
                </Badge>
            </li>

            <Search />

            {!auth?.user ? (
                <div className='d-flex justify-content-around align-items-center'>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            LOGIN
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">
                            REGISTER
                        </NavLink>
                    </li>
                </div>
            ) : (
                <div className='dropdown'>
                    <buton 
                        className='nav-link pointer dropdown-toggle' 
                        data-bs-toggle="dropdown">
                        {auth?.user?.name?.toUpperCase()}
                    </buton>

                    <ul className='dropdown-menu'>
                        <li>
                            <NavLink 
                                className='nav-link' 
                                to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                            >
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="nav-item pointer">
                            <button className="nav-link" onClick={handleLogout}>
                                LOGOUT
                            </button>
                        </li>
                    </ul>

                </div>
               
            )}
        </ul>
    </> );
}

export default Menu;