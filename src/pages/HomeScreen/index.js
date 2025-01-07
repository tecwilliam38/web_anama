import React, { useEffect, useState } from 'react'

import "./styles.css"
import NavInner from '../../components/nav.inner';
import { MdOndemandVideo, MdOutlineGroups2 } from 'react-icons/md';
import { FaRegImages } from "react-icons/fa";
import { GoHomeFill } from 'react-icons/go';
import HeaderScreen from '../../components/Cards';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../App';
import { v4 as uuidv4 } from "uuid";
import { Navigate } from 'react-router-dom';


export default function HomeScreen() {
  const usuarioLogado = useUser();
  const [userImages, setUserImages] = useState([]);
  const [userMsg, setUsermsg] = useState("No que você está pensando?");
  // console.log("Usuario id:",usuarioLogado.id);

  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('user_images')
      .list(usuarioLogado?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" }
      });
    if (data !== null) {
      setUserImages(data);
    } else {
      alert("Erro de leitura de imagens");
      console.log(error);
    }
  }

  const [selectImage, setSelectecImage] = useState([]);

  // async function selectImage(e) {
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   return file;
  // }

  async function uploadImage(e) {
    //  Armazenar a foto no supabase:    
    const { data, error } = await supabase.storage.from('user_images')
      .upload(usuarioLogado.id + "/" + uuidv4(), selectImage)
    if (data) {
      getImages();
    } else {
      console.log("imagens não encontradas", error);
    }
  }

  useEffect(() => {
    if (usuarioLogado) {
      getImages();
    }
  }, [usuarioLogado, uploadImage])

  // https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/496443ad-44d9-4d87-8d45-3f222d585ea2/19d275a1-15f5-4640-a052-ac3469cb8c4c
  async function deleteImage(imageName) {
    const { error } = await supabase
      .storage
      .from('user_images')
      .remove([usuarioLogado.id + "/" + imageName])

    if (error) {
      alert(error);
    } else {
      getImages();
    }
  }


  const CDNURL = "https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/";

  return (
    <>
      <div className='continer-fluid'>
        <NavInner />
        <section className='row d-flex justify-content-between align-items-start bg-body'>
          <div className='col col-12 col-lg-3'>
            <div className='row d-flex justify-content-around align-items-center  py-3'>
              <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                alt=""
              />
              {sessionStorage.getItem("sessionEmail")}
            </div>
            <div className='row d-flex justify-content-around align-items-center py-3'>
              <MdOndemandVideo size={40} />
              {localStorage.getItem("sessionName")}
            </div>
            <div className='row d-flex justify-content-around align-items-center py-3'>
              <MdOutlineGroups2 size={40} />
              {localStorage.getItem("sessionEmail")}

            </div>
            <div className='row d-flex justify-content-around align-items-center py-3'>
              <GoHomeFill size={40} />
              {localStorage.getItem("sessionName")}

            </div>
            <div className='row d-flex justify-content-around align-items-center py-3'>
              <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
              />
              {localStorage.getItem("sessionName")}
            </div>
            <hr />
          </div>
          <div className='col col-12 col-lg-6 text-center'>
            {!usuarioLogado ?
              ""
              :
              <>
                <div className='row row-create-post d-flex justify-content-between align-items-center bg-light'>
                  <div className='row container d-flex align-items-center mt-3'>
                    <div className='col col-1'>
                      <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                        style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                        alt=""
                      />
                    </div>
                    <div className='col mx-2'>
                      <input
                        type="text"
                        className="form-control input-post"
                        data-toggle="modal" data-target="#createPostModal"
                        value={"No que você está pensando " + localStorage.getItem("sessionName")}
                        readonly />
                    </div>
                  </div>
                  <hr />
                  <div className='row container justify-content-around d-flex align-items-center my-3'>
                    <MdOutlineGroups2 size={40} />
                    <div className='col'>
                      <FaRegImages for="select-file" size={40} placeholder="Pesquisar" type="button" data-toggle="modal" data-target="#modalSelect-file" />
                      <p>Adicione uma foto</p>
                    </div>

                    <MdOutlineGroups2 size={40} />
                  </div>
                </div>
                <div className='row d-flex justify-content-around'>
                  {userImages.map((image) => {
                    return (
                      <>
                        <HeaderScreen
                          urlKey={CDNURL + usuarioLogado.id + "/" + image.name}
                          image={image.name}
                          imageURL={CDNURL + usuarioLogado.id + "/" + image.name}
                          onClick={deleteImage} />
                      </>
                    )
                  })}
                </div>


                {/* Modal */}
                <div className="modal fade" id="createPostModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h5 className="modal-title" id="exampleModalLabel">Criar Post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        ...
                        <div className='col'>
                      <FaRegImages for="select-file" size={40} placeholder="Pesquisar" type="button" data-toggle="modal" data-target="#modalSelect-file" />
                      <p>Adicione uma foto</p>
                    </div>
                        {/* <input type="file" accept="image/png, image/jpeg" onChange={(e) => setSelectecImage(e.target.files[0])} /> */}
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary">Salvar mudanças</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
          <div className='col col-12 col-lg-3 text-center col-right'>coluna 3</div>

          {/* Modal image */}

          <div class="modal fade" id="modalSelect-file" tabindex="-1" role="dialog" aria-labelledby="modalSelect-file" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Escolha um arquivo</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input type="file" accept="image/png, image/jpeg" onChange={(e) => setSelectecImage(e.target.files[0])} placeholder='William'/>
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={()=>uploadImage()} >Enviar foto</button>
                </div>
              </div>
            </div>
          </div>
        </section >
      </div >
    </>

  )
}


{/* <div className="card-deck" key={CDNURL + usuarioLogado.id + "/" + image.name} >
<div className="card">
  <img className="card-img-top" src={CDNURL + usuarioLogado.id + "/" + image.name} alt="Imagem de capa do card" />
  <div className="card-body">
    <h5 className="card-title">Suas Fotos</h5>
    <p className="card-text">Este é um card mais longo com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este conteúdo é um pouco maior.</p>
    <p className="card-text"><small className="text-muted">Atualizados 3 minutos atrás</small></p>
  </div>
</div>
</div> */}


{/*  <div className='h1 text-center'>Usuário logado:<hr /> {usuarioLogado.email}</div>
  <form>
  <div className="form-group text-center">
    <div className="custom-file" style={{ maxWidth: "500px" }}>
      <input type="file"
        onChange={(e) => uploadImage(e)}
        className="custom-file-input" id="customFile" accept='image/png, image/jpeg, image/jpg'
      />
      <label className="custom-file-label" for="customFile">Escolher arquivo</label>
      <button type='submit' className='btn btn-danger btn-block' onClick={(e) => uploadImage(e)}>Enviar foto.</button>
    </div>
  </div>
</form> */}

