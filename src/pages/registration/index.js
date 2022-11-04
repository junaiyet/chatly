import React from 'react'

function Registation() {
  return (
    <div className="flex">
        <div className="w-2/4 flex justify-end">
            <div className="mr-16 mt-56	">
            <h3 className='font-nunito font-bold text-4xl text-heading mb-3.5'>Get started with easily register</h3>
            <p className='font-nunito font-normal text-xl text-secondary '>Free register and you can enjoy it</p>
            <div className="relative mt-16">
            <input type="email" className='border border-solid border-secondary w-96 py-6 px-14 rounded-lg ' />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Email Address</p>
            </div>
            <div className="relative mt-16">
            <input type="text" className='border border-solid border-secondary w-96 py-6 px-14 rounded-lg ' />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Full name</p>
            </div>
            <div className="relative mt-16">
            <input type="password" className='border border-solid border-secondary w-96 py-6 px-14 rounded-lg ' />
             <p className='font-nunito font-semibold text-sm text-heading absolute left-[40px] top-[-10px] px-4 bg-white'>Password</p>
            </div>
            <button className='w-96 bg-primary font-nunito font-semibold text-xl rounded-full text-white mt-12	py-3.5 px-5'>Sign up</button>
            <p className='text-center w-96 '>Already  have an account ? <span>Sign In</span></p>
            </div>
        </div>
        <div className="w-2/4">
            <img className='w-full h-screen object-cover' src="images/registation.png" alt="" />
        </div>
    </div>
  )
}

export default Registation