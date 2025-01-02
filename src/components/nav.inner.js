import React from 'react'

// Icons
import { MdOndemandVideo } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineGroups2 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import api from '../constants/api';

export default function NavInner() {
    const navigate = useNavigate();

    function Logout() {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionEmail");
        localStorage.removeItem("sessionName");
        api.defaults.headers.common['authorization'] = "";
        navigate("/");
    }
    return (
        <>
            <div>
                <nav className='row d-flex justify-content-between align-items-center bg-nav'>
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
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                                            style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                                        />
                                    </a>
                                    <div class="dropdown-menu mr-3" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Ação</a>
                                        <a class="dropdown-item" href="#">Outra ação</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Algo mais aqui</a>
                                        <button type='button' className="btn btn-primary btn-block" onClick={Logout}>Sair</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
