import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BlockedUsers from '../components/BlockedUsers'
import FriendRequest from '../components/FriendRequest'
import Friends from '../components/Friends'
import GroupsList from '../components/GroupsList'
import MyGroups from '../components/MyGroups'
import Search from '../components/Search'
import Sidebar from '../components/Sidebar'
import UserList from '../components/UserList'
function Home() {
  let navigate = useNavigate()
  let data = useSelector((state)=>state.userLoginInfo.userInfo )
  console.log(data)
  useEffect(()=>{
    if(!data){
      navigate("/login");
    }
  },[])
  return (
    <div className='flex gap-x-11'>
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
    </div>
  )
}

export default Home