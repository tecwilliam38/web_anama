import React, { useState } from 'react'
import Menu from '../../components/navbar';
import "./styles.css"
import { Link, useNavigate } from 'react-router-dom';
import api from '../../constants/api';


export default function StartScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [showPpass, setShowPass] = useState("password");

  async function HandleRegister() {
    setMsg("");
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password
      });

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_admin);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
        navigate("/home");

      } else {
        setMsg("Erro ao criar conta. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.log(error);

      if (error.response?.data.error)
        setMsg(error.response?.data.error);
      else
        setMsg("Erro ao criar conta. Tente novamente mais tarde.");
    }
  }
  return (
    <>
      <Menu />
      <div className='continer-fluid'>
        <div className="align-items-center d-flex bg" >
          <div className="row ml-5">
            <div className="mt-5 col-sm-12 col-12 text-center ">
              <form className="form-group text-light">
                <div className="px-4 pt-3 pb-2 ">
                  <h1 className="mb-4">Abra uma conta</h1>
                  <div className="mt-4">
                    <input type="text" placeholder="Nome"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mt-4">
                    <input type="email" placeholder="E-mail"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mt-4">
                    <input type={showPpass} placeholder="Nova senha"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                    {/* <Link onClick={() => setShowPass("text")}>Exibir senha</Link> */}
                  </div>
                  <div className="mt-3 mb-5">
                    <button onClick={HandleRegister} className="btn btn-primary w-100" type="button">Cadastrar</button>
                  </div>
                  {/* <span className="me-1">Já tenho uma conta.</span>
                  <Link to="/" className="ml-2">Faça login!</Link> */}
                </div>
              </form>
            </div>
            <div className="col-sm-7 h1"></div>
          </div>
        </div>
      </div>
    </>
  )
}
