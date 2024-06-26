import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from '../../context/auth';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Custom hook
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/login`, {
                email, 
                password
            }
        );
        console.log(data);
        if(data?.error) {
            toast.error(data.error);
        } else {
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth({ ...auth, token: data.token, user: data.user });
            toast.success("Login successful!");
            navigate(location.state || `/dashboard/${data?.user?.role === 1 ? 'admin' : 'user'}`);
        }
            console.log( email, password);
        } catch (err) {
            console.log(err);
            toast.error("Login failes. Try again!")
        }
    }

    return ( 
    <div>
        <Jumbotron title="LOGIN" subtitle="Please login and experience at E-commerce"/>

        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type='email' 
                            className='form-control mb-4 p-2' 
                            placeholder='Nhập email của bạn' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus 
                        />
                        <input 
                            type='password' 
                            className='form-control mb-4 p-2' 
                            placeholder='Nhập mật khẩu của bạn' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus 
                        />

                        <button className='btn btn-primary' type='submit'>Đăng nhập</button>
                    </form>
                </div>
            </div>
        </div>
    </div> );
}

export default Login;