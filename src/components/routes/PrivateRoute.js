import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

function PrivateRoute () {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    // UseEffect with middleware in NodeJS
    useEffect(() => {
        const authCheck = async () => {
            const { data } = await axios.get(`/auth-check`);
            if (data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };

        authCheck();
}, [auth?.token])

    // useEffect(() => {
    //     if(auth?.token) {
    //         setOk(true);
    //     } else {
    //         setOk(false);
    //     }
    // }, [auth?.token]);
    
    return ok ? <Outlet /> : <Loading />;
}

export default PrivateRoute;