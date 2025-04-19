import React, { useContext, useState } from 'react'
import "./styles.css"
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import { AuthContext, useAuth } from '../../context/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { supabase } from '../../App';
import NaviBarLogin from '../../components/loginNavbar';

export default function LoginScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [showPpass, setShowPass] = useState("password");
  const {login, setUser} = useAuth()


  async function HandleRegister(e) {
    e.preventDefault();
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
        window.localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_user);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        
        
        sessionStorage.setItem("sessionUserToken", response.data.token);
        sessionStorage.setItem("sessionUserId", response.data.id_user);
        sessionStorage.setItem("sessionUserEmail", email);
        sessionStorage.setItem("sessionUserName", name);
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
       <NaviBarLogin/>
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