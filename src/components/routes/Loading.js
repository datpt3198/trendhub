import { useEffect, useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import img from '../../images/loading.gif'


function Loading({ path = "login" }) {
    const[count, setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });

        return () => clearInterval(interval);
    }, [count]);

    return ( 
    <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={img} alt="Loading..." style={{width: "50px"}} />
        <h4>Redirecting you in {count} seconds </h4>
    </div> )
}
    export default Loading;