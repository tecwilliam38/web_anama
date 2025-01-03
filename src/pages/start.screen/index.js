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

  async function HandleRegister() {
    setMsg("");
    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password
      });

      if (response.data) {
         // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."
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
      <div className="container-fluid bg">        
        <div className='row bg-navbar d-flex align-items-center'>
          <img src={require("../../assets/logo.png")} alt="Anama" className='logo-login' />
          <section className='row'>
            <article className='col-11 col-sm-5 mx-auto mx-lg-0 my-1'>
              <input type="email" placeholder="E-mail"
                className="form-control nav-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </article>
            <article className='col-11 col-sm-4 mx-auto mx-lg-0 my-1'>
              <input type={showPpass} placeholder="Senha"
                className="form-control nav-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </article>
            <article className='col-11 col-sm-3 mx-auto mx-lg-0 my-lg-1'>
              <button onClick={HandleLogin} className="nav-input btn btn-sm btn-block btn-primary" type="button">Login</button>
            </article>
          </section>
        </div>
        <div className='row ml-sm-5 d-flex align-items-center' >
          <div className='col col-sm-4 col-12 d-flex justify-content-start align-items-center'>
            <form className="form-group text-light">
              <div className="px-4 mt-sm-5 pt-3 pb-2 ">
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
                </div>
                <div className="mt-3 mb-5">
                  <button onClick={HandleRegister} className="btn btn-primary w-100" type="button">Cadastrar</button>
                </div>
              </div>
            </form>
          </div>
          {/* <div className='col'></div> */}
        </div>
        <div></div>
      </div>
    </>
  )
}
// <div className='row border bg-navbar w-100'>
//   <div className='col border col-sm-12'>
//     <img src={require("../../assets/logo.png")} style={{ height: 55 }} />
//     <label for="exampleInputEmail1 text-left ">Endereço de email</label>
//     <input type="email" placeholder="E-mail"
//       className="form-control form-control-sm"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)} />
//   </div>
// </div>
// <div className='row border justify-content-between bg'>
//   <div className='col border col-sm-12'>lateral</div>
//   <div className='col border col-8'>meio</div>
// </div>

// <Menu />