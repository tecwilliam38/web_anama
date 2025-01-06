import React, { useEffect, useState } from 'react'

import "./styles.css"
import NavInner from '../../components/nav.inner';
import { MdOndemandVideo, MdOutlineGroups2 } from 'react-icons/md';
import { GoHomeFill } from 'react-icons/go';
import HeaderScreen from '../../components/carroussel';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../App';
import { v4 as uuidv4 } from "uuid";


export default function HomeScreen() {
  const usuarioLogado = useUser();
  const [userImages, setUserImages] = useState([]);
  // console.log("Usuario id:",usuarioLogado.id);

  async function getImages() {
    const { data, error } = await supabase
    .storage
    .from('user_images')
    .list(usuarioLogado?.id + "/", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc"}
    });
    if(data !== null) {
     setUserImages(data);
    } else {
      alert("Erro de leitura de imagens");
      console.log(error);
    }
  }

  async function uploadImage(e) {
    // e.preventDefault();
    let file = e.target.files[0];
    //  Armazenar a foto no supabase:
    const { data, error } = await supabase.storage.from('user_images')
      .upload(usuarioLogado.id + "/" + uuidv4(), file)
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
  }, [usuarioLogado])

  // https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/496443ad-44d9-4d87-8d45-3f222d585ea2/19d275a1-15f5-4640-a052-ac3469cb8c4c

  const CDNURL = "https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/";

  return (
    <>
      <div className='continer-fluid'>
        <NavInner />
        {userImages.map((image) => {
          return (
            <>
              <div class="card-deck" key={CDNURL + usuarioLogado.id + "/" + image.name} >
                <div class="card">
                  <img class="card-img-top" src={CDNURL + usuarioLogado.id + "/" + image.name} alt="Imagem de capa do card" />
                  <div class="card-body">
                    <h5 class="card-title">Suas Fotos</h5>
                    <p class="card-text">Este é um card mais longo com suporte a texto embaixo, que funciona como uma introdução a um conteúdo adicional. Este conteúdo é um pouco maior.</p>
                    <p class="card-text"><small class="text-muted">Atualizados 3 minutos atrás</small></p>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        {!usuarioLogado ?
          ""
          :
          <>
            <div className='h1 text-center'>Usuário logado:<hr /> {usuarioLogado.email}</div>
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
            </form>
          </>
        }
        <section className='row d-flex justify-content-between align-items-center bg-body'>
          <div className='col col-12 col-lg-3 text-center col-left '>
            <div className='row d-flex justify-content-around align-items-center py-3'>
              <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                alt=""
              />
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
            {/* <HeaderScreen images={userImages} /> */}
            William

          </div>
          <div className='col col-12 col-lg-3 text-center col-right'>coluna 3</div>
        </section>
      </div>
    </>

  )
}
