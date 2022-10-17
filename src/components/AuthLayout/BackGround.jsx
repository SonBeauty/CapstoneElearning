import React from 'react'
import { Outlet } from 'react-router-dom'
import image from '../../img/backapp.b46ef3a1.jpg'

const BackGround = () => {
    return (
        <div style={{
            backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",
            height: '100vh', width: '100vw'
        }}><Outlet  /> </div >
    )
}

export default BackGround