import React, { useState } from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from  'react-loader-spinner'
import {  Link,useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';
function Login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let navigate = useNavigate()
    const dispatch = useDispatch()
    let [email , setEmail] = useState("")
    let [password , setPassword] = useState("")
    let [emailerr , setEmailerr] = useState("")
    let [passworderr , setPassworderr] = useState("")
    let [passwordshow , setPasswordShow] = useState(false)
    let [success , setSuccess] = useState(false)
    let [loading , setLoading] = useState(false)
    let handleEmail=(e)=>{
      setEmail(e.target.value)
      setEmailerr("")
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
      if(email  && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            setLoading(false)
            toast.success("Login Successfull. Wait for Rederection")
          // console.log("Login user Information",user.user)
          dispatch(userLoginInfo(user.user)) 
          localStorage.setItem("userInfo",JSON.stringify(user))
          setTimeout(()=>{
                navigate("/")
            },2000)
        })
        .catch((error) => {
          const errorCode = error.code;
          if(error.code.includes("auth/user-not-found")){
            setEmailerr("Email not found")
        }
          if(error.code.includes("auth/wrong-password")){
             setPassworderr("Password not match")
         }
     
         setLoading(false)
        });

      }
      
    }
    let handleGoogleSignIn = ()=>{
        signInWithPopup(auth, provider).then(()=>{
            navigate("/")
        })

    }
  return (
    <div className="md:flex px-3 md:px-0">
    <ToastContainer position="bottom-center" theme="dark" />
      <div className="md:w-2/4 w-full md:flex justify-end ">
          <div className="md:mr-0 lg:mr-16  xl:mt-40 	mt-20 px-4">
          <h3 className='font-nunito text-center md:text-left font-bold text-3xl lg:text-4xl text-heading mb-2 md:mb-3.5'>Login to your account!</h3>
          <div className="img">
            <img onClick={handleGoogleSignIn} src="images/google.png" alt="" />
          </div>
          {success && (
             <p className='font-nunito font-semibold text-2xl text-heading bg-green-600 text-white  rounded-sm mt-1.5 p-2.5'>{success}</p>
           )}
          <div className="relative md:mt-16 mt-8 lg:w-96 w-full">
          <input type="email" className='border border-solid border-secondary  py-6 px-14 rounded-lg lg:w-96 w-full	' value={email} onChange={handleEmail} />
           <p className='font-nunito font-semibold text-sm text-heading absolute left-0 top-[-10px]  bg-white'>Email Address</p>
           {emailerr && (
             <p className='font-nunito font-semibold text-sm text-heading bg-red-600 text-white   mt-1.5 p-2.5'>{emailerr}</p>
           )}
          </div>
          <div className="relative md:mt-16 mt-8 lg:w-96 w-full">
          <input type={passwordshow?"text":"password"} className='border border-solid border-secondary  py-6 px-14 rounded-lg lg:w-96 w-full' value={password} onChange={handlePassword} />
          {passwordshow?(<AiOutlineEye className='absolute top-7	 right-5'  onClick={()=>setPasswordShow(!passwordshow)}/> ) : ( <AiOutlineEyeInvisible className='absolute top-7	 right-5' onClick={()=>setPasswordShow(!passwordshow)}/>)
          }
         
           <p className='font-nunito font-semibold text-sm text-heading absolute left-0 top-[-10px]  bg-white'>Password</p>
           {passworderr && (
             <p className='font-nunito font-semibold text-sm text-heading bg-red-600 text-white   mt-1.5 p-2.5'>{passworderr}</p>
           )}
          </div>
       
                {loading? <div className="flex justify-center lg:w-96 w-full mt-5"><BallTriangle height={100}width={100}radius={5}color="#5F35F5"ariaLabel="ball-triangle-loading"wrapperClass={{}}wrapperStyle=""visible={true}/></div> :
                   <button className='lg:w-96 w-full bg-primary font-nunito font-semibold text-xl rounded-full text-white md:mt-12 mt-8	py-3.5 px-5' onClick={handleSubmit}>Login to Continue</button>             
                 }  
          <p className='text-center mb-6 lg:w-96 w-full font-open font-normal text-sm md:mt-9 mt-4'>Don’t have an account ?<Link to={"/registation"} className='font-bold text-[#EA6C00]'>Sign up</Link></p>
          <p className='text-center mb-6 lg:w-96 w-full font-open font-normal text-sm md:mt-9 mt-4'><Link to={"/forgotpassword"} className='font-bold text-[#EA6C00]'>Forgot Password</Link></p>
          </div>
      </div>
      <div className="w-2/4 hidden md:block max-lg:hidden ">
          <img className='w-full md:h-screen lg:h-screen h-full object-cover' src="images/login.png" alt="" />
      </div>
  </div>
  )
}

export default Login