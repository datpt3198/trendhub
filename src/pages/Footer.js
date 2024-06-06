import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import grabLogo from "../images/grablogo.png";
import shopeeLogo from "../images/shopeelogo.png"

function Footer() {
    return ( 
        <div className="container-fluid bg-light pt-4 mt-4 footer">
            <div className="d-flex justify-content-between container p-2">
                <div className="footer-items">
                    <h3 className="">Giới thiệu <span className="text-primary">TrendHub</span></h3>
                    <ul>
                        <li>Giới thiệu công ty</li>
                        <li>Liên hệ</li>
                        <li>Tin công nghệ</li>
                        <li>Blog tin tức</li>
                    </ul>
                    <div className="icons-list d-flex justifiy-content-around align-items-center g-2">
                        <FontAwesomeIcon className="icon" icon={faFacebook} style={{color: "#0258FF"}} />
                        <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
                        <img src={shopeeLogo} alt="shopee" className="icon"/>
                        <img src={grabLogo} alt="grab" className="icon"/>
                    </div>
                </div>
                <div className="footer-items">
                    <h3>Hỗ trợ khách hàng</h3>
                    <ul >
                        <li>Tra cứu đơn hàng</li>
                        <li>Hướng dẫn mua trực tuyến</li>
                        <li>Hướng dẫn mua hàng trả góp</li>
                        <li>Hóa đơn điện tử</li>
                        <li>Góp ý - Khiếu nại</li>
                    </ul>
                </div>
                <div className="footer-items">
                    <h3>Chính sách chung</h3>
                    <ul>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách doanh nghiệp</li>
                        <li>Chính sách giao hàng</li>
                        <li>Chính sách thuế VATs</li>
                        <li>Bảo mật thông tin khách hàng</li>
                    </ul>
                </div>
                <div className="footer-items">
                    <h3>Thông tin khuyến mãi</h3>
                    <ul>
                        <li>Sản phẩm mới</li>
                        <li>Sản phẩm khuyến mãi</li>
                        <li>Chương trình khuyến  mãi</li>
                    </ul>
                </div>
            </div>
        </div>
     );
}

export default Footer;