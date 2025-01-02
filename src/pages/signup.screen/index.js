import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../../components/navbar';
import "./styles.css"

export default function SignUpScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [showPpass, setShowPass] = useState("password");

  async function HandleRegister() {

  }

  return (
    <>
      <Menu />
      {/* <div id="bg"> */}
      <div className="bg align-items-center d-flex" >
        <div className="row ml-5 pl-5 mt-5">
          <div className="mt-5 col-sm-7 col-7 text-center">
            <form className="form-signin">
              <div className="px-4 pt-3 pb-2 ">
                <h5 className="mb-4">Gerencie seus agendamentos de forma descomplicada.</h5>
                <h5 className="mb-4 text-secondary">Cadastre-se</h5>
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
                  <input type={showPpass} placeholder="Senha"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <Link onClick={() => setShowPass("text")}>Exibir senha</Link>
                </div>
                <div className="mt-3 mb-5">
                  <button onClick={HandleRegister} className="btn btn-primary w-100" type="button"> Criar minha conta</button>
                </div>
                <span className="me-1">Já tenho uma conta.</span>
                <Link to="/" className="ml-2">Faça login!</Link>
              </div>
            </form>
          </div>
          <div className="col-sm-7 h1"></div>
        </div>
      </div>
    </>
  )
}
