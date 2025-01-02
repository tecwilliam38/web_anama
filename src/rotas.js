import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './pages/home'
import StartScreen from './pages/start.screen'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartScreen />} />
                <Route path="/home" element={<HomeScreen />} />
            </Routes>
        </BrowserRouter>
    )
}
