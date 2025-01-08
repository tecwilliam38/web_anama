import React from 'react'
import { GoHomeFill } from 'react-icons/go'
import { MdOndemandVideo, MdOutlineGroups2 } from 'react-icons/md'

export default function SideMenu() {
    return (
        <>
         <div className='col col-12 col-lg-3'>
                    <div className='row d-flex justify-content-around align-items-center  py-3'>
                      <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                        style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                        alt=""
                      />
                      {sessionStorage.getItem("sessionEmail")}
                    </div>
                    <div className='row d-flex justify-content-around align-items-center py-3'>
                      <MdOndemandVideo size={40} />
                      {localStorage.getItem("sessionName")}
                    </div>
                    <div className='row d-flex justify-content-around align-items-center py-3'>
                      <MdOutlineGroups2 size={40} />
                      {localStorage.getItem("sessionEmail")}
        
                    </div>
                    <div className='row d-flex justify-content-around align-items-center py-3'>
                      <GoHomeFill size={40} />
                      {localStorage.getItem("sessionName")}
        
                    </div>
                    <div className='row d-flex justify-content-around align-items-center py-3'>
                      <img src="https://scontent-gig4-1.xx.fbcdn.net/v/t39.30808-1/465466365_3900245316920279_7048055760126137183_n.jpg?stp=cp0_dst-jpg_s40x40_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeEXkzQgA6DPOBcFQelwt6J06pxB3-N7CH3qnEHf43sIfacbqRC2trqxnFV5OpaU95P9oApcSa0fCwt4ykzJA1VK&_nc_ohc=9NEK3Xt4aToQ7kNvgFFQ3m0&_nc_zt=24&_nc_ht=scontent-gig4-1.xx&_nc_gid=ABD6hvunPtk1TlkxpWO_z-M&oh=00_AYD2HaUlybErhNjw_kIVoyOwMCHW859fZacfYlDz-Uzj3g&oe=677CCA5F"
                        style={{ width: 50, height: 50, borderRadius: 30, resize: "cover" }}
                      />
                      {localStorage.getItem("sessionName")}
                    </div>
                    <hr />
                  </div>
        </>
    )
}
