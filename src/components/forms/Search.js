import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

import { useSearch } from "../../context/search";
import useCategory from "../../hooks/useCategory";

function Search() {
    const categories = useCategory();

    const [values, setValues] = useSearch()
    const navigate = useNavigate();

    const handlSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`/products/search/${values?.keyword}`);
            setValues({...values, results: data});
            navigate('/search');
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <form className='d-flex border-2' style={{borderRadius: "10px"}} onSubmit={handlSubmit}>
            <input 
                type='search'
                placeholder='Search'
                className='form-control'
                style={{width: "300px", border: "none", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px"}}
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            />
            <button onClick={() => navigate('/search')} className='btn btn-primary' style={{border: "none", borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
                Search
            </button>
        </form>
     );
}

export default Search;