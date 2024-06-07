function CategoryForm({ value, setValue, photo, setPhoto, handleSubmit,handleDelete, buttonText = 'Submit' }) {
    return ( 
        <div className="p-3">
            
                
                <div className="pt-2">
                    <label className="btn btn-outline-secondary col-12 mb-3">
                            {photo ? photo.name : "Upload photo"}

                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={e => setPhoto(e.target.files[0])}
                            hidden
                        />
                    </label>
                </div>
                <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Write category name"
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                />
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary mt-3" onClick={handleSubmit} >{buttonText}</button>
                    {handleDelete && 
                        <button onClick={handleDelete} className="btn btn-danger mt-3" >
                            Xóa
                        </button>
                    }
                </div>
            
        </div>
     );
}

export default CategoryForm;