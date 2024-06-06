import useCategory from "../../hooks/useCategory";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import Search from "../forms/Search";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, NavLink } from "react-router-dom";

function Header() {
    const categories = useCategory();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate('/login')
    }

    return ( 
        <div className="container-fluid bg-light">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <strong><a className="text-primary fs-1" href="/">TrendHub</a></strong>
                </div>
                <div className="search d-flex">
                    <Search />
                </div>
                <div className="cart">
                <li className="nav-item d-flex">
                    <Badge 
                        count={cart?.length >=1 ? cart.length : 0} 
                        offset={[0, 0]}
                        showZero={true}
                    >
                        <FontAwesomeIcon icon={faCartShopping} style={{fontSize: "36px", color: "#7A6B6B"}}/>
                    </Badge>
                    <NavLink 
                        className="px-4" 
                        aria-current="page" 
                        to="/cart"
                        style={{fontSize: "20px", textDecoration: "none", color: "#7A6B6B"}}
                    >
                        Your Cart
                    </NavLink>
                </li>
                </div>
                <div className="sign">
                    {!auth?.user ? (
                        <div className='d-flex justify-content-around align-items-center auth-item'>
                            <li className="nav-item">
                                <NavLink className="nav-link m-2" to="/login">
                                    LOGIN
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link m-2" to="/register">
                                    REGISTER
                                </NavLink>
                            </li>
                        </div>
                    ) : (
                        <div className='dropend'>
                            <buton 
                                className='nav-link pointer dropdown-toggle' 
                                data-bs-toggle="dropdown">
                                <strong>
                                    {auth?.user?.name?.toUpperCase()}
                                </strong>
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
                </div>
            </div>
        </div>
     );
}

export default Header;