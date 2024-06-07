import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGift, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons'

import { useCart } from "../context/cart";
import miband from "../images/miband8.png";
import miband2 from "../images/miband82.png";
import miband3 from "../images/miband83.png";
import dell from '../images/dell2.png';
import dell2 from '../images/dell3.png';
import dell3 from '../images/dell4.png';
import hplap from '../images/hplap.png';
import hplap2 from '../images/hplap2.png';
import hplap3 from '../images/hplap3.png';
import oppo from '../images/oppophone.png';
import xiaomi from '../images/xiaomi.png';
import xiaomi2 from '../images/realmi.png';
import ipad from '../images/ipad.png';
import ipad2 from '../images/ipad2.png';
import samsung from '../images/watch.png';
import samsung2 from '../images/watch2.png';

function ProductDetail() {
    const [cart, setCart] = useCart();

    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug])

    const loadProduct = async (req, res) => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`);
            console.log("Data => ", data)
            setProduct(data);
            loadRelated(data._id, data.category._id)
        } catch (err) {
            console.log(err)
        }
    };

    const loadRelated = async (productId, categoryId) => {
        try {
            const { data } = await axios.get(`/related-products/${productId}/${categoryId}`);
            setRelated(data);
        } catch (err) {
            console.log(err)
        }
    }
    let imgUrl = null;
    const dellImg = [dell, dell2, dell3];
    const hpImg = [hplap, hplap2, hplap3]
    const phoneImg = [oppo, xiaomi, xiaomi2];
    const watchImg = [miband, miband2, miband3];
    const samsungWatch = [samsung, samsung2];
    const tabletImg = [ipad, ipad2];
    let imgSlide = [];

    if (params.slug === 'dell-precision') {
        imgSlide = [ ...dellImg ]
    } else if (params.slug === 'galaxy-s23-ultra' || params.slug === 'xiaomi-redmi-note-13') {
        imgSlide = [ ...phoneImg ]
    } else if (params.slug === 'smartwatch') {
        imgSlide = [ ...watchImg ]
    } else if (params.slug === 'ipad-air-5' || params.slug === 'ipad-pro-m4') {
        imgSlide = [ ...tabletImg ]
    } else if (params.slug === 'hp-elitebook-630-g10') {
        imgSlide = [ ...hpImg ]
    } else if (params.slug === 'samsung-galaxy-fit3') {
        imgSlide = [ ...samsungWatch ]
    } 

    return ( 
        <div className="container-fluid">
            <div className="container">
                {/* Đường dẫn */}
                <div className="d-flex m-2">
                    <div className='d-flex justify-content-around align-items-center'>
                        <FontAwesomeIcon icon={faHouse}  className='me-2'/>
                        <Link className='m-0 text-link' to={'/'} >Trang chủ</Link>
                    </div>
                    <span className='m-2'>
                        {`>`}
                    </span>
                    <p className="my-2">{params.slug}</p>
                    <span className='m-2'>
                    {`>`}
                </span>
                <p className="my-2">{product.name}</p>
                </div>
            </div>
            <div className="container">
                {/* Thông tin sản phẩm */}
                <div className='mx-4'>
                    <h2 className="fw-bold">{product?.name}</h2>   
                </div>
                
                <div className='row'>
                   
                    <div className="col-md-5">
                        <img 
                            className='card-img-top p-3 m-3 border'
                            src={imgUrl === null ? `${process.env.REACT_APP_API}/product/photo/${product._id}` : imgUrl} 
                            alt='anh minh hoa'
                            style={{height: "auto", width: "100%", objectFit: "cover"}}
                        />

                        <div className="d-flex justify-content-around align-items-center">
                            <img 
                                src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                                alt='anh minh hoa' 
                                className="card-img-top border"
                                style={{width: "120px", height: "120px"}}
                            />
                            {imgSlide?.map((img, i) => (
                                <img 
                                    src={img} 
                                    alt='anh minh hoa' 
                                    key={i} 
                                    className="card-img-top border"
                                    style={{width: "120px", height: "120px"}}
                                    onClick={() => {
                                        return imgUrl = img
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                        
                    <div className="col-md-7 d-flex flex-column ">
                        <div className="d-flex justify-content-between lead p-2 bg-light fw-bold ">
                            <div>
                                <h3>Thông số sản phẩm</h3>
                                {product?.short_desc?.map((sd, i) => (
                                    <div className="d-flex justify-content-start" key={i}>
                                        <FontAwesomeIcon icon={faCircle} style={{fontSize: "8px"}} className="m-2 pt-1" />
                                        <p className="m-0 ">{sd}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-warning my-3">
                            <h4 className="m-4">${product?.price}</h4>
                        </div>

                        <div className="border my-3">
                            <p className="px-3 pt-3 m-0">DỊCH VỤ BẢO HÀNH</p>
                            <div className="d-flex p-3">
                                <input type="checkbox" />
                                <p className="my-0 mx-2">Gói bảo hành 12 tháng tại Trendhub cho sản phẩm từ $99 đến $999</p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header text-danger fw-bold">
                                <FontAwesomeIcon icon={faGift} className="me-2" />
                                Quà tặng kèm theo
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Bộ quà tặng trị giá $19</li>
                                <li className="list-group-item">Phiếu vệ sinh bảo dưỡng miễn phí 3 năm</li>
                                <li className="list-group-item">Ưu đãi giảm giá lên đến 5%</li>
                            </ul>
                        </div>

                        <button 
                            className='btn btn-primary card-button text-center m-2 justify-items-end ' 
                            style={{borderBottomRightRadius: "5px", width: "300px"}}
                            onClick={() => {
                                setCart([...cart, product])
                                toast.success("Added product in your cart")
                            }}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>     
                </div>
                <div className="bg-light p-4 m-2">
                    <h5>Giới thiệu về sản phẩm</h5>
                    <p>{product?.long_desc}</p>
                </div>   
            </div>
        </div>
    );
}

export default ProductDetail;