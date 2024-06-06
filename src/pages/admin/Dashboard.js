import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";

function AdminDashboard() {
    const [auth, setAuth] = useAuth();


    return ( 
    <div className="container-fluid">
        <Jumbotron title={`Hello ${auth?.user?.name}`} subtitle="Admin Dashboard" />


        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Information</div>
                    <ul className='list-group'>
                        <li className='list-group-item'>{auth?.user?.name}</li>
                        <li className='list-group-item'>{auth?.user?.email}</li>
                        <li className='list-group-item'>Admin</li>
                    </ul>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminDashboard;