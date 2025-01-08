import React from 'react'
import "./style.css"

export default function HeaderScreen(props) {
        

    return (
        <>
            <div className='col col-12 col-sm-4'  key={props.urlKey}>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block card-imageUsers" src={props.imageURL} alt="Primeiro Slide" />
                            <button type="button" className="btn btn-danger btn-block rounded" onClick={() => props.onClick(props.image)}>Excluir foto</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
