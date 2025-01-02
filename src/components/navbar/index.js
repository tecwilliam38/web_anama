import React, { useState } from 'react'
import "./style.css"
import api from '../../constants/api';
import { useNavigate} from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();

    const [showPpass, setShowPass] = useState("password");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState("");

    async function HandleLogin() {
        setMsg("");
        try {
            const response = await api.post("/users/login", {
                email,
                password
            });
            if (response.data) {
                // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionId", response.data.id_admin);
                localStorage.setItem("sessionEmail", response.data.email);
                localStorage.setItem("sessionName", response.data.name);
                api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
                navigate("/home")
            } else {
                console.log(response);
            }
        } catch (error) {
            if (error.response?.data.error) {
                setMsg(error.response?.data.error);
            } else {
                setMsg("Ocorreu um erro ao efetuar login")
            }
            console.log(error);

        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-navbar m-0">
                <a className="navbar-brand " href="#">
                    <img src={require("../../assets/logo.png")} />
                </a>
                <button className="navbar-toggler text-light" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse text-light m-0" id="conteudoNavbarSuportado">
                    <div className='col-12 d-flex justify-content-between'>
                        <div className='container' >
                            <ul className="navbar-nav">
                                <form class="form-group ml-auto">
                                    <div className='row' >
                                        <div className='text-label'>
                                            <label for="exampleInputEmail1 text-left ">Endereço de email</label>
                                            <input type="email" placeholder="E-mail"
                                                className="form-control form-control-sm"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className='ml-2'>
                                            <label for="exampleInputPassword1">Senha</label>
                                            <input type={showPpass} placeholder="Senha"
                                                id="exampleInputPassword1"
                                                className="form-control form-control-sm"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <div className='ml-auto'>Esqueceu a Senha?</div>
                                        </div>
                                        <div className='mx-2 pt-2'>
                                            <button onClick={HandleLogin} className="mt-4 btn btn-sm btn-primary" type="button">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}
