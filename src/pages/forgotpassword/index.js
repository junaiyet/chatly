import React, { useState } from 'react'
import {  Link,useNavigate  } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';


function ForgotPassword() {
    const auth = getAuth();
    let navigate = useNavigate()
    let [email , setEmail] = useState("")
   let handleForgotPassword = ()=>{

       sendPasswordResetEmail(auth, email)
       .then(() => {
        toast.success("Check your email for reset password")
        setTimeout(()=>{
            navigate("/login")
        },2000)
       })
       .catch((error) => {
         const errorCode = error.code;
         toast.error(errorCode)
       });
   }
  return (
    <div className='bg-primary w-full h-screen flex justify-center items-center'>
        <ToastContainer position="bottom-center" theme="dark" />
        <div className="bg-white p-5 rounded w-96">
        <h3 className='font-nunito font-bold text-4xl text-heading mb-3.5 '>Forgot Password</h3>
        <div className="relative mt-5 ">
            <input onChange={(e)=> setEmail(e.target.value)} type="email" className='border border-solid border-secondary  py-6 px-14 rounded-lg w-full'  />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Email Address</p>
      
            </div>
            <button className=' bg-primary font-nunito font-semibold text-xl rounded text-white mt-5	py-3.5 px-5' onClick={handleForgotPassword}>Update</button>             
            <button className=' bg-primary font-nunito font-semibold text-xl rounded text-white mt-5	py-3.5 px-5 ml-5'><Link to={"/login"}>Back To Login</Link></button>             

        </div>
    </div>
  )
}

export default ForgotPassword