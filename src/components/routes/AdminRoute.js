import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

function AdminRoute () {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    // UseEffect with middleware in NodeJS
    useEffect(() => {
        const adminCheck = async () => {
            const { data } = await axios.get(`/admin-check`);
            if (data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }

        adminCheck();
}, [auth?.token])
    
    return ok ? <Outlet /> : <Loading path="" />;
}

export default AdminRoute;