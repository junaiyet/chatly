import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BlockedUsers from '../components/BlockedUsers'
import FriendRequest from '../components/FriendRequest'
import Friends from '../components/Friends'
import GroupsList from '../components/GroupsList'
import MyGroups from '../components/MyGroups'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
import UserList from '../components/UserList'
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../../slices/userSlice';


function Home() {
  const auth = getAuth();
  let navigate = useNavigate()
  let data = useSelector((state)=>state.userLoginInfo.userInfo )
  let [varify,setVarify]  = useState(false)
  const dispatch = useDispatch()
  onAuthStateChanged(auth,(user)=>{
    if(user.emailVerified){
      setVarify(true)
      dispatch(userLoginInfo(user)) 
      localStorage.setItem("userInfo",JSON.stringify(user))
    }
  })
  console.log(data)
  useEffect(()=>{
    if(!data){
      navigate("/login");
    }
  },[])
  return (
    <div className='flex gap-x-11'>
      {varify ? 
      <>
          <div className="w-[186px] pl-2.5">
        <Sidebar/>
      </div>
      <div className="w-[427px]">
        <Search/>
        <GroupsList/>
        <FriendRequest/>
      </div>
      <div className="w-[427px]">
        <Friends/>
        <MyGroups/>
      </div>
      <div className="w-[427px]">
        <UserList/>
        <BlockedUsers/>
      </div>
      </>
      :
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className='bg-primary font-nunito font-bold text-5xl text-white p-5'>Please verify your email</h1>
      </div>
      }
 
    </div>
  )
}

export default Home