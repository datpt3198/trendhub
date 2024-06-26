import { Link } from "react-router-dom";

import useCategory from "../hooks/useCategory";
import Jumbotron from "../components/cards/Jumbotron";

function CategoriesList() {
    const categories = useCategory()

    return ( 
    <>
        <Jumbotron/>

        <div className="container overflow-hidden">
            <div className="row gx-5 gy-5 mt-3 mb-5" >
                {categories?.map(c => (
                    <div className="col-md-6" key={c._id}>
                        <button className="btn btn-light col-12 text-dark p-3">
                            <Link to={`/category/${c.slug}`}>{c.name}</Link>
                        </button>
                    </div>
                ))}    
            </div>    
        </div> 
    </> );
}

export default CategoriesList;