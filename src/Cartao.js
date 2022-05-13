function Cartao(props){
    return(
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.titulo}</h5>
                    <p className="card-text">{props.children}</p>
                </div>
            </div>
        </div>
    )
}

export default Cartao;