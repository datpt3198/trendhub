function Jumbotron(props) {

    return ( 
    <div 
        className="container-fluid jumbotron"
        style={{marginTop: '-8px', height: '200px'}}
    >
        <div className="row">
            <div className="col text-center p-5">
                <h1>{props.title}</h1>
                <p className="lead">{props.subtitle}</p>
            </div>
        </div>
    </div> );
}

export default Jumbotron;