import React, { useEffect, useState } from 'react'
import { supabase } from '../../App';
import { useUser } from '@supabase/auth-helpers-react';
import { v4 as uuidv4 } from "uuid";
import { FaRegImages } from 'react-icons/fa6';




export default function RightMenu() {
    const usuarioLogado = useUser();
    const [selectImage, setSelectecImage] = useState([]);
    const [userProfile, setUserProfile] = useState([]);

    async function getProfile() {
        const { data, error } = await supabase
            .storage
            .from("user_profile")
            .list(usuarioLogado.id + "/", {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" }
            });
        if (data !== null) {
            setUserProfile(data);
        } else {
            // alert("Erro de leitura de imagens");
            console.log(error);
        }
    }

    async function uploadProfile() {
        //  Armazenar a foto no supabase:    
        const { data, error } = await supabase.storage.from('user_profile')
            .upload(usuarioLogado.id + "/" + uuidv4(), selectImage)
        if (data) {
            getProfile();
        } else {
            console.log("imagens não encontradas", error);
        }
    }

    useEffect(() => {
        if (usuarioLogado) {
            getProfile();
        }
    }, [])
    const CDNURL = "https://kpcanhcozznqvfibklhd.supabase.co/storage/v1/object/public/user_images/";
    return (
        <>
            <div className='col col-12 col-lg-3 text-center col-right'>
                Menu Lateral
                <div className='col'>
                    <FaRegImages for="select-file" size={40} placeholder="Pesquisar" type="button" data-toggle="modal" data-target="#modalProfile" />
                    <p>Adicione uma foto</p>
                </div>
                <div className='row d-flex justify-content-around'>
                    {userProfile.map((image) => {
                        return (
                            <>
                                <div key={CDNURL + usuarioLogado.id + "/" + image.name}>
                                    <img className="d-block card-image-profile" src={CDNURL + usuarioLogado.id + "/" + image.name} alt="Primeiro Slide" />
                                </div>
                            </>
                        )
                    })}

                </div>

                {/* Modal adicionar foto */}
                <div className="modal fade" id="modalProfile" tabindex="-1" role="dialog" aria-labelledby="modalSelect-profile" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Escolha umafoto de perfil</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="file" accept="image/png, image/jpeg" onChange={(e) => setSelectecImage(e.target.files[0])} placeholder='William' />
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={() => uploadProfile()} >Enviar foto</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
