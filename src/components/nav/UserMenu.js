import { NavLink } from "react-router-dom";

function UserMenu() {
    return ( 
        <>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Người dùng</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className="list-group-item" to="/dashboard/user/profile">
                        Hồ sơ
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/user/orders">
                        Đơn hàng
                    </NavLink>
                </li>
            </ul>
        </>
     );
}

export default UserMenu;