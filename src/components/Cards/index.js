import React from 'react'
import "./style.css"

export default function HeaderScreen(props) {
    const imagesUser = props.imageURL;
    console.log(imagesUser.data);

    return (
        <>
            <div className='col col-12 col-sm-4'  key={props.urlKey}>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block card-imageUsers" src={props.imageURL} alt="Primeiro Slide" />
                            <button type="button" className="btn btn-danger btn-block rounded" onClick={() => props.onClick(props.image)}>Excluir foto</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
