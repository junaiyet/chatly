import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { getDatabase, ref, onValue,set, push} from "firebase/database";
import {useSelector} from "react-redux"
function UserList() {
  const db = getDatabase();
  let [userlist , setUserList] = useState([])
  let data = useSelector(state=> state.userLoginInfo.userInfo)
  let [friendrequestlist,setFriendRequestList] = useState([])
  // console.log(data.uid)


  useEffect(()=>{
        const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{
      if(data.uid != item.key){
        arr.push({...item.val(),userid:item.key})
      }
    });
    setUserList(arr)
    });

  },[])
  console.log(userlist)

    let handleFriendRequest =(item)=>{
      set(push(ref(db, 'friendrequest/')), {
        sendername:data.displayName,
        senderid:data.uid,
        recivername:item.username,
        reciverid:item.userid,
      });
    }
    useEffect(()=>{
        const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
        let arr = []
    snapshot.forEach(item=>{
        arr.push(item.val().reciverid+item.val().senderid)
    });
    setFriendRequestList(arr)
    });
    },[])

  return (
  
    <div className='w-full rounded-lg bg-white py-3 px-5 shadow-lg mt-11 h-[344px] overflow-y-scroll'>
    <div className="relative">
      <h3 className='font-nunito font-bold text-xl'>User List</h3>
      <BsThreeDotsVertical className="absolute top-[6px] right-[6px] text-primary" />
    </div>
    {userlist && userlist.map(item=>(
    <div className="flex gap-x-5 items-center border-b pb-3.5 mt-3.5 border-solid border-primary">
      <div className="img">
          <img className='w-[70px] h-[70px] rounded-full' src="images/demoimg.png" alt="" />
      </div>
      <div className="text-area ">
          <h3 className='font-nunito font-bold text-xl'>{item.username}</h3>
          <hp className='font-nunito font-bold text-sm text-[#4D4D4D]'>{item.email}</hp>
      
      </div>
      <div className="img">
        {friendrequestlist.includes(item.userid+data.uid) || friendrequestlist.includes(data.uid+item.userid) ? 
          <button className='font-nunito font-bold text-xl bg-primary text-white py-1 px-5 rounded'>p</button>
      :
      <button onClick={()=>handleFriendRequest(item)} className='font-nunito font-bold text-xl bg-primary text-white py-1 px-5 rounded'>+</button>
       }
        
      </div>
    </div>

    ))}

  </div>
  )
}

export default UserList