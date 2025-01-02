import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../constants/api';

export default function HomeScreen() {
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
     <div className='h1 text-center'>HomeScreen
      <br/>
     <button onClick={Logout} title='Sair' type='button' className='btn btn-primary'>Sair</button>
     </div>
    </>

  )
}
