import React, { useEffect, useState } from 'react'

import "./styles.css"
import NavInner from '../../components/nav.inner';
import { MdOutlineGroups2 } from 'react-icons/md';
import { FaRegImages } from "react-icons/fa";

import HeaderScreen from '../../components/Cards';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../../App';
import { v4 as uuidv4 } from "uuid";
import SideMenu from '../../components/sideMenu';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import CenterScreen from '../../components/center';
import RightMenu from '../../components/rightMenu';




export default function HomeScreen() {
  const navigate = useNavigate();
  const usuarioLogado = useUser();

  const [file, setFile] = useState([]);
  const [userMsg, setUsermsg] = useState("No que você está pensando?");
  


  return (
    <>
      <div className='continer-fluid'>
        <NavInner />
        <section className='row d-flex justify-content-around align-items-start bg-body'>
          <SideMenu/>
          <CenterScreen/>
          <RightMenu/>
        </section >
      </div >
    </>

  )
}

 