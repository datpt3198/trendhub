import { NavLink } from 'react-router-dom';

function Menu() {

    return ( 
    <div className='container-fluid bg-primary'>
        <div className='container'>
            <ul className='nav d-flex justify-content-start shadow-sm sticky-top'>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/laptop`} >Máy tính</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/smartphone`} >Điện thoại</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/smartwatch`} >Đông hồ thông minh</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/tablets`} >Máy tính bảng</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/airpods`} >Tai nghe</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link nav--link' aria-current="page" to={`/category/sale-off`} >Khuyến mãi</NavLink>
                </li>
            </ul>
        </div>
    </div> );
}

export default Menu;