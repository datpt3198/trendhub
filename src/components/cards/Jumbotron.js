import banner from "../../images/banner.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";
import banner4 from "../../images/banner4.png";
import banner5 from "../../images/banner5.png";

function Jumbotron(props) {

    return ( 
        <div className="container-fluid">
            <div className="container">
                <div id="myCarousel" className="carousel slide">

                    {/* Slide images */}
                    
                    <div className="carousel-inner" >
                        <div className="carousel-item active">
                            <div className="d-flex justify-content-center g-5" >
                                <img src={banner} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center g-5" >
                                <img src={banner2} className="d-block w-100" alt="..."/>
                            </div>      
                        </div>
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center g-5" >
                                <img src={banner3} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center g-5" >
                                <img src={banner4} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center g-5" >
                                <img src={banner5} className="d-block w-100" alt="..."/>
                            </div>
                        </div>
                    </div>

                    {/* Slide button control */}

                    <div class="carousel-indicators ">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <button className="carousel-control-prev position-absolute top-50 start-0 translate-middle" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon border bg-dark icon-prev" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next position-absolute top-50 start-100 translate-middle" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon border bg-dark icon-next" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                
            </div>
        </div>
    )
};

export default Jumbotron;