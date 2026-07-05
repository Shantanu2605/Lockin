import React from 'react'

const Footer = () => {
  return (
    <div className='w-full fixed bottom-0 bg-[black] text-white flex justify-between md:justify-center md:gap-4 items-center items-center h-[60px]'>
       <h2 className='text-xl gap-1 cursor-default flex items-center'><img src="logo.png" width={30} alt="" />LockIN</h2>

       <span className='flex'>Made with <img className='mx-2' src="heart.png"  width={30}  alt="" /> by Shantanu</span> 

     
      
    </div>
  )
}

export default Footer
