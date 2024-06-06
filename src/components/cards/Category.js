

function CategoryCard( { c } ) {

    return ( 
        <div className='d-flex flex-direction-columns align-items-center card hoverable mb-3 border-none'>
            <img 
                src={`${process.env.REACT_APP_API}/category/photo/${c._id}`} 
                alt={c.slug} 
                className='card-img-top m-1'
                style={{height: "auto", width: "80px", objectFit: "cover"}}
            />
            <div className='card-body'>
                <h4>{c?.name}</h4>
            </div>
        </div>
     );
}

export default CategoryCard;