import React from 'react'
import {AiOutlineHome,AiFillMessage} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {FiSettings} from 'react-icons/fi'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { userLoginInfo } from '../../slices/userSlice';

function Sidebar() {
    const auth = getAuth();
   let navigate = useNavigate()
   let dispatch = useDispatch()
    let handleLogOut =()=>{
        console.log("logout")
        signOut(auth).then(() => {
            dispatch(userLoginInfo(null))
            localStorage.removeItem("userInfo")
            navigate("/login")
          }).catch((error) => {
            // An error happened.
          });
    }
  return (
    <div className='w-full bg-primary h-screen rounded-2xl p-9'>
     <div className="w-24 h-24 rounded-full	">
        <img className="mx-auto w-24 h-24 rounded-full" src="images/profile.png" alt="" />
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-white after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-primary before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <AiOutlineHome className='text-5xl text-[#5F35F5] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <AiFillMessage className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <IoMdNotificationsOutline className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <FiSettings className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
     <div onClick={handleLogOut} className="mt-24 relative z-[1] after:z-[-1]	 after:bg-none after:w-[137%] after:h-[89px] after:content-[''] after:absolute after:top-[-16px] after:left-0 after:rounded-tl-lg after:rounded-bl-lg before:w-[8px] before:h-[185%] before:bg-none before:absolute before:top-[-16px] before:right-[-35px] before:content-[''] before:rounded-tl-lg before:rounded-bl-lg ">
     <RiLogoutBoxRLine className='text-5xl text-[#BAD1FF] mx-auto'/>
     </div>
       
    </div>
  )
}

export default Sidebar