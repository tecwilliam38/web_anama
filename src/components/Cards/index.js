import React from 'react'

export default function HeaderScreen(props) {
    const imagesUser = props.imageURL;
    console.log(imagesUser.data);
    
    return (
        <>
                <div className='col' key={props.urlKey}>
                    <div className="card-group" >
                        <div className="card">
                            <img className="card-img-top" src={props.imageURL} alt="Imagem de capa do card" />
                            <div className="card-body">
                                <h5 className="card-title">Título do card</h5>                                
                                <p className="card-text"><small className="text-muted">Atualizados 3 minutos atrás</small></p>
                                <button type="button" className="btn btn-danger btn-block rounded" onClick={() => props.onClick(props.image)}>Delete Image</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
