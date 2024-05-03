function CategoryForm({ value, setValue, handleSubmit,handleDelete, buttonText = 'Submit' }) {
    return ( 
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Write category name"
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                />
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary mt-3" >{buttonText}</button>
                    {handleDelete && 
                        <button onClick={handleDelete} className="btn btn-danger mt-3" >
                            Delete
                        </button>
                    }
                </div>
            </form>
        </div>
     );
}

export default CategoryForm;