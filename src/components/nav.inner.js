import React, { useEffect, useState } from 'react'

// Icons
import { MdOndemandVideo } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineGroups2 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import api from '../constants/api';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../App';
import { v4 as uuidv4 } from "uuid";


export default function NavInner() {
    const navigate = useNavigate();
    const usuarioLogado = useUser();
    const [userProfile, setUserProfile] = useState([]);
    const [userMsg, setUsermsg] = useState("No que você está pensando?");

    const [selectImage, setSelectedImage] = useState([]);

    const handleFileChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (!selectImage) return;
        const { data, error } = await supabase
            .storage
            .from("user_profile")
            .upload(usuarioLogado.id + "/" + uuidv4(), selectImage)
            if(data){
                getProfile();
                alert("foto Enviada")
            }else {
                console.log("imagens não encontradas", error);
                alert("foto não enviada")}
    }

    async function uploadProfile(e) {
        //  Armazenar a foto no supabase:    

        const { data, error } = await supabase.storage.from('user_profile')
            .upload(usuarioLogado.id + "/" + uuidv4(), selectImage)
        if (data) {
            getProfile();
            alert("foto Enviada")
        } else {
            console.log("imagens não encontradas", error);
            alert("foto não enviada")
        }
    }

    async function getProfile() {
        const { data, error } = await supabase
            .storage
            .from('user_profile')
            .list(usuarioLogado?.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });
        if (data !== null) {
            setUserProfile(data);
        } else {
            alert("Erro de leitura de imagens");
            console.log(error);
        }
    }

    useEffect(() => {
        // if (usuarioLogado !== null) {
        //     return;   
        // }
        getProfile();

    }, [])
    //   console.log("email do usuário",usuarioLogado.email);

    async function deleteImage(imageName) {
        const { error } = await supabase
            .storage
            .from('user_profile')
            .remove([usuarioLogado.id + "/" + imageName])

        if (error) {
            alert(error);
        } else {
            getProfile();
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const CDNURL = "https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/";







    function Logout() {
        api.defaults.headers.common['authorization'] = "";
        localStorage.clear()
        const { error } = supabase.auth.signOut()
        navigate("/");
    }
    return (
        <>
            <div>
                <nav className='row d-flex justify-content-around align-items-center bg-nav'>
                    <div className='col-3'>
                        <ul className="nav ml-4">
                            <a className="navbar-brand " href="#">
                                <img src={require("../assets/logoinner.png")} style={{ height: 55 }} />
                            </a>
                            <form className='form-inline my-lg-0' >
                                <input style={{ borderRadius: 15 }} className="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar"></input>
                            </form>
                        </ul>
                    </div>
                    <div className='col-5'>
                        <div className='row d-flex justify-content-around'>
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        <GoHomeFill size={40} />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <MdOndemandVideo size={40} />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        <MdOutlineGroups2 size={40} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='row d-flex align-items-center justify-content-around'>
                            <ul className="nav">
                                <li className="nav-item mt-3">
                                    {localStorage.getItem("sessionName")}
                                    <a className="nav-link disabled" href="#"></a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false"
                                    // key={CDNURL + usuarioLogado.id + "/" + profile.name}
                                    >
                                        {userProfile?.map((profile) => {
                                            return (
                                                <>
                                                    <img
                                                        src={CDNURL + usuarioLogado.id + "/" + profile.name}
                                                        style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                                                    />
                                                </>
                                            )
                                        }
                                        )}
                                    </a>
                                    <div className="dropdown-menu mr-3" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Ação</a>
                                        <a
                                            className="dropdown-item" for="select-file"
                                            size={40} placeholder="Pesquisar" type="button"
                                            data-toggle="modal" data-target="#modalSelect-profile">
                                            Alterar foto do perfil
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Algo mais aqui</a>
                                        <button type='button' className="btn btn-primary btn-block" onClick={Logout}>Sair</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Modal Foto perfil */}
                        <div className="modal fade" id="modalSelect-profile" tabindex="-1" role="dialog" aria-labelledby="modalSelect-profile" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Escolha uma foto</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="file" accept="image/png, image/jpeg"
                                            onChange={handleFileChange} placeholder='William' />
                                        ...
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={handleUpload} >Enviar foto</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
