import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from  'react-loader-spinner'

function Registation() {
  const auth = getAuth();
  let [email , setEmail] = useState("")
  let [fullname , setFullName] = useState("")
  let [password , setPassword] = useState("")
  let [emailerr , setEmailerr] = useState("")
  let [fullnameerr , setFullNameerr] = useState("")
  let [passworderr , setPassworderr] = useState("")
  let [passwordshow , setPasswordShow] = useState(false)
  let [success , setSuccess] = useState(false)
  let [loading , setLoading] = useState(false)
  let handleEmail=(e)=>{
    setEmail(e.target.value)
    setEmailerr("")
  }
  let handleFullName=(e)=>{
    setFullName(e.target.value)
    setFullNameerr("")
  }
  let handlePassword=(e)=>{
    setPassword(e.target.value)
    setPassworderr("")
  }
  let handleSubmit=()=>{
    if(!email){
      setEmailerr("email is requerd")
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
        setEmailerr("Invalid email !")
      }
    }
    if(!fullname){
      setFullNameerr("name is requerd")
    }
    if(!password){
      setPassworderr("password is requerd")
    }
    // else{
    //   if(!/^(?=.*[a-z])/.test(password)){
    //     setPassworderr("Lowercase requerd")
    //   }else if(!/^(?=.*[A-Z])/.test(password)){
    //     setPassworderr("Upparcase requerd")
    //   }else if(!/^(?=.*[0-9])/.test(password)){
    //     setPassworderr("Number requerd")
    //   }else if(!/^(?=.*[!@#$%^&*])/.test(password)){
    //     setPassworderr("Special character requerd")
    //   }else if(!/^(?=.{8,})/.test(password)){
    //     setPassworderr("The Password must be eight characters or longer")
    //   }
    // }
    if(email && fullname && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
      setLoading(true)
      createUserWithEmailAndPassword(auth,email,password).then(()=>{
        toast.success("Registation succesfull. please varify your email !");
        setEmail("")
        setFullName("")
        setPassword("")
        sendEmailVerification(auth.currentUser)
        setLoading(false)
      }).catch((error)=>{
        // setEmailerr(error.code);
        if(error.code.includes("auth/email-already-in-use")){
          setEmailerr("Email Already in user !");
          setLoading(false)
        }
      })

    }
  }
  return (
    <div className="flex">
      <ToastContainer position="bottom-center" theme="dark" />
        <div className="w-2/4 flex justify-end">
            <div className="mr-16 mt-40	">
            <h3 className='font-nunito font-bold text-4xl text-heading mb-3.5'>Get started with easily register</h3>
            <p className='font-nunito font-normal text-xl text-secondary '>Free register and you can enjoy it</p>
            {success && (
               <p className='font-nunito font-semibold text-2xl text-heading bg-green-600 text-white  rounded-sm mt-1.5 p-2.5'>{success}</p>
             )}
            <div className="relative mt-16 w-96">
            <input type="email" className='border border-solid border-secondary  py-6 px-14 rounded-lg w-96' value={email} onChange={handleEmail} />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Email Address</p>
             {emailerr && (
               <p className='font-nunito font-semibold text-sm text-heading bg-red-600 text-white  rounded-sm mt-1.5 p-2.5'>{emailerr}</p>
             )}
            </div>
            <div className="relative mt-16 w-96">
            <input type="text" className='border border-solid border-secondary  py-6 px-14 rounded-lg w-96' value={fullname} onChange={handleFullName} />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Full name</p>
             {fullnameerr && (
               <p className='font-nunito font-semibold text-sm text-heading bg-red-600 text-white rounded-sm mt-1.5 p-2.5'>{fullnameerr}</p>
             )}
            </div>
            <div className="relative mt-16 w-96">
            <input type={passwordshow?"text":"password"} className='border border-solid border-secondary  py-6 px-14 rounded-lg w-96' value={password} onChange={handlePassword} />
            {passwordshow?(<AiOutlineEye className='absolute top-7	 right-5'  onClick={()=>setPasswordShow(!passwordshow)}/> ) : ( <AiOutlineEyeInvisible className='absolute top-7	 right-5' onClick={()=>setPasswordShow(!passwordshow)}/>)
            }
           
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Password</p>
             {passworderr && (
               <p className='font-nunito font-semibold text-sm text-heading bg-red-600 text-white  rounded-sm mt-1.5 p-2.5'>{passworderr}</p>
             )}
            </div>
         
                  {loading? <div className="flex justify-center w-96 mt-5"><BallTriangle height={100}width={100}radius={5}color="#5F35F5"ariaLabel="ball-triangle-loading"wrapperClass={{}}wrapperStyle=""visible={true}/></div> :
                     <button className='w-96 bg-primary font-nunito font-semibold text-xl rounded-full text-white mt-12	py-3.5 px-5' onClick={handleSubmit}>Sign up</button>             
                   }  
            <p className='text-center w-96 font-open font-normal text-sm mt-9'>Already  have an account ? <span className='font-bold text-[#EA6C00]'>Sign In</span></p>
            </div>
        </div>
        <div className="w-2/4">
            <img className='w-full h-screen object-cover' src="images/registation.png" alt="" />
        </div>
    </div>
  )
}

export default Registation