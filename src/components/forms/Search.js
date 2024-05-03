import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSearch } from "../../context/search";

function Search() {

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
        <form className='d-flex' onSubmit={handlSubmit}>
            <input 
                type='search'
                placeholder='Search'
                className='form-control'
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            />
            <button className='btn btn-outline-primary'>
                Search
            </button>
        </form>
     );
}

export default Search;