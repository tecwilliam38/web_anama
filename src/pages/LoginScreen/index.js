import React, { useContext, useState } from 'react'
import "./styles.css"
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import { AuthContext, useAuth } from '../../context/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from '../../App';

export default function LoginScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [showPpass, setShowPass] = useState("password");
  const {login, setUser} = useAuth()

  async function HandleLogin(e) {
    e.preventDefault();
    setMsg("");
    try {
      const response = await api.post("/users/login", {
        email,
        password
      });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert("Error")
        console.log(error);
      }
      else{
        localStorage.setItem("sessionUserEmail", email)
        localStorage.setItem("sessionUserPass", password)
        sessionStorage.setItem("sessionUserEmail", email)
        sessionStorage.setItem("sessionUserPass", password)
      }
      if (response.data) {
        // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."

        window.localStorage.setItem("loggedIn", true);
        localStorage.setItem("sessionId", response.data.id_user);
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionEmail", response.data.email);
        localStorage.setItem("sessionName", response.data.name);       
        api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
       
        setUser(response.data);
        // console.log(response.data);
        navigate("/home");
      } else {
        console.log(response.data);
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        alert("Error")
        console.log(error);
      }
      if (response.data) {
        // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."
        window.localStorage.setItem("loggedIn", true);
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_user);
        // localStorage.setItem("sessionId", response.data.id_admin);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
      
        setUser(response.data);
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
        </div>
        <div></div>
      </div>
    </>
  )
}