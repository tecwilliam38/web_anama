import React from 'react'

export default function HeaderScreen(props) {
    return (
        <>
            <div className="card-deck">
                <div className="card">
                    <img className="card-img-top" src="https://m.media-amazon.com/images/I/91lNNhSYpvL.png" alt="Imagem de capa do card"/>
                        <div className="card-body">
                            <h5 className="card-title">Título do card</h5>
                            <p className="card-text">Este é um card mais longo com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este conteúdo é um pouco maior.</p>
                            <p className="card-text"><small className="text-muted">Atualizados 3 minutos atrás</small></p>
                        </div>
                </div>
                <div className="card">
                    <img className="card-img-top" src="https://m.media-amazon.com/images/I/81klW9P+LFL.png" alt="Imagem de capa do card"/>
                        <div className="card-body">
                            <h5 className="card-title">Título do card</h5>
                            <p className="card-text">Este é um card com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional.</p>
                            <p className="card-text"><small className="text-muted">Atualizados 3 minutos atrás</small></p>
                        </div>
                </div>
                <div className="card rounded">
                    <img className="card-img-top" src="https://m.media-amazon.com/images/I/91Oc4h01LQL.png" alt="Imagem de capa do card"/>
                        <div className="card-body">
                            <h5 className="card-title">Título do card</h5>
                            <p className="card-text">Este é um card maior com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este card tem o conteúdo ainda maior que o primeiro, para mostrar a altura igual, em ação.</p>
                            <p className="card-text"><small className="text-muted">Atualizados 3 minutos atrás</small></p>
                        </div>
                </div>
            </div>
        </>
    )
}
