import React from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs'
function Search() {
  return (
    <div className='relative'>
        <input type="text" className='w-full rounded-lg p-5 pl-[78px] shadow-lg outline-0' placeholder='Search' />
        <BsSearch className="absolute top-[26px] left-[30px]" />
        <BsThreeDotsVertical className="absolute top-[26px] right-[26px] text-primary" />
    </div>
  )
}

export default Search