import { useUser } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { MdOndemandVideo, MdOutlineGroups2 } from 'react-icons/md'
import { supabase } from '../../App';

export default function SideMenu() {

  const usuarioLogado = useUser();
  const [selectImage, setSelectecImage] = useState([]);
  const [userImages, setUserImages] = useState([]);

  async function getImagesProfile() {
    const { data, error } = await supabase
      .storage
      .from('user_images')
      .list(usuarioLogado?.id + "/profile");
    if (data !== null) {
      setUserImages(data);
      // console.log(userImages);
      
    } else {
      alert("Erro de leitura de imagens");
      console.log(error);
    }
  }
  const CDNURL = "https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/";

  // useEffect(() => {
  
    if (usuarioLogado) {
      getImagesProfile();
    }
    else {
      console.log("Erro aqui");
      
    }
  // })

  // if(userImages){
  //   console.log(userImages);
  // }else{
  //   console.log("Sem fotos",userImages);
  // }
  
  return (
    <>
      <div className='col col-12 col-lg-3'>
        <div className='row d-flex justify-content-around align-items-center  py-3'>
          {userImages?.map((imageProfile) => {
            return (
              <>
                <img key={CDNURL + usuarioLogado.id + "/profile" + imageProfile.name}
                  src={CDNURL + usuarioLogado.id + "/profile"}
                  style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                  alt=""
                />
              </>
            )
          })}
          {localStorage.getItem("sessionEmail")}
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
      </div >
    </>
  )
}
