import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import api from "../../constants/api"
import {supabase} from "../../App"

export default function NaviBarLogin() {
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
    
            window.localStorage.setItem("isLoggedIn", "true");
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
  return (
    <>
       <div className='row bg-navbar d-flex justify-content-around align-items-center'>
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
    </>
  )
}