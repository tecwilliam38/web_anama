import React from 'react'
import "./style.css"

import { FaTrashAlt } from "react-icons/fa";

export default function HeaderScreen(props) {
        

    return (
        <>
            <div className='col col-12 col-sm-4'  key={props.urlKey}>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block card-imageUsers card-img-top" src={props.imageURL} alt="Primeiro Slide" />
                            <button type="button" className="btn btn-danger btn-block rounded mt-1 d-flex justify-content-around" onClick={() => props.onClick(props.image)}>
                                Excluir foto <FaTrashAlt size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
