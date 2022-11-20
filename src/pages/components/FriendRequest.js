import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs'
import { getDatabase, ref, onValue,set, push} from "firebase/database";
import {useSelector} from "react-redux"
function FriendRequest() {
  const db = getDatabase();
  let data = useSelector(state=> state.userLoginInfo.userInfo)
  let [friendrequestlist,setFriendRequestList] = useState([])

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest');
  onValue(friendrequestRef, (snapshot) => {
      let arr = []
  snapshot.forEach(item=>{
    if(item.val().reciverid == data.uid){
      arr.push({...item.val(),id:item.key })
    }
  });
  setFriendRequestList(arr)
  });
  },[])
  return (
    <div className='w-full rounded-lg bg-white py-3 px-5 shadow-lg mt-11 h-[344px] overflow-y-scroll'>
      <div className="relative">
        <h3 className='font-nunito font-bold text-xl'>Friend  Request</h3>
        <BsThreeDotsVertical className="absolute top-[6px] right-[6px] text-primary" />
      </div>

      {friendrequestlist.map(item=>(

      <div className="flex gap-x-5 items-center border-b pb-3.5 mt-3.5 border-solid border-primary">
        <div className="img">
            <img className='w-[70px] h-[70px] rounded-full' src="images/demoimg.png" alt="" />
        </div>
        <div className="text-area ">
            <h3 className='font-nunito font-bold text-xl'>{item.sendername}</h3>
            {/* <hp className='font-nunito font-bold text-sm text-[#4D4D4D]'>Hi Guys, Wassup!</hp> */}
        
        </div>
        <div className="img">
            <button className='font-nunito font-bold text-xl bg-primary text-white py-1 px-5 rounded'>Join</button>
        </div>
      </div>
      ))}

   
  
    </div>
  )
}

export default FriendRequest