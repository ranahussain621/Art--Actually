import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Login from '../Screens/Login.jsx'
import SignUp from '../Screens/Signup.jsx'
export function Auth(){
  return (
    <>
      <Routes>
      <Route  element={<Login/>} />
        <Route  element={<SignUp />} />

      </Routes>
    </>
  )
}

export default Auth