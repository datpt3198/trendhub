import { NavLink } from 'react-router-dom';

function Menu() {

    return ( 
    <div className='container-fluid bg-primary'>
        <div className='container'>
            <ul className='nav d-flex justify-content-start shadow-sm sticky-top'>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/laptop`} >Laptop</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/smartphone`} >Smartphone</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/smartwatch`} >Smartwatch</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/tablets`} >Tablets</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/airpods`} >Aripods</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/sale-off`} >Sale off</NavLink>
                </li>
            </ul>
        </div>
    </div> );
}

export default Menu;