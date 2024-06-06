import { useSearch } from "../context/search";
import PCardShop from "../components/cards/PCardShop";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import {prices} from '../prices'

import { Checkbox, Radio } from 'antd';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function Search() {
    const [values, setValues] = useSearch();
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]); 

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories')
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    };

    const handleCheck = (value, id) => {
        let all = [ ...checked ];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }

        setChecked(all);
    };

    return ( 
    <>
        <div className="container">
           <div className="d-flex justify-content-between bg-light m-0 p-0">
                <p className="p-1 m-1">{`Home > Search > ${values?.keyword}`}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mx-5 px-5 py-1 my-1">Kết quả tìm kiếm cho: {values.keyword}</p>
                    <div className="d-flex justify-content-around align-items-center">
                        <FontAwesomeIcon icon={faFilter} />
                        <p className="p-1 m-1">{values?.results.length} sản phẩm</p>
                    </div>
                </div>
           </div>
        </div>

        <div className="container pt-5">
            <div className="row">
                <div className="col-md-3">
                    <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                        Filter by Categories
                    </h4>
                    <div className="row p-5">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={e => handleCheck(e.target.checked, c._id)} >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    <h4 className="p-3 mt-2 mb-2 bg-light text-center">
                        Filter by Price
                    </h4>
                    <div className="row p-5">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {prices?.map((price) => (
                                <div key={price._id} style={{margin: "8px"}}>
                                    <Radio value={price.array} >
                                        {price.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="p-5 pt-0">
                        <button 
                            className="btn btn-outline-secondary col-12"
                            onClick={() => window.location.reload()}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    
                    <div className="" style={{  overflow: "scroll" }}>
                        {values.results.length === 0 ? (<h1>Not found products!!!</h1>)  : values?.results?.map(p => (
                            <div key={p._id} className="mt-4">
                                <PCardShop p={p} />
                            </div>
                        ))}                  
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default Search;