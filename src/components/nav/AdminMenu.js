import { NavLink } from "react-router-dom";

function AdminMenu() {
    return ( 
        <>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Quản trị viên</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/category">
                        Tạo danh mục sản phẩm mới
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/product">
                        Tạo sản phẩm mới
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/products">
                        Danh sách sản phẩm
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item" to="/dashboard/admin/orders">
                        Quản lí đơn hàng
                    </NavLink>
                </li>
            </ul>
        </>
     );
}

export default AdminMenu;