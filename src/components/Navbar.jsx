import React from 'react'




const Navbar = (props) => {
  const changetheme= ()=>{
  
  const theme= !props.theme;
  props.settheme(theme);
  if(theme){
    document.body.style.backgroundColor = '#000';
  }
  else{
    document.body.style.backgroundColor = '#fff';

  }
  
}

  return (
    <nav className={`flex justify-around ${props.theme? "text-white": "text-black"} font-bold py-4 items-center`}>
        <h2 className='text-2xl gap-1 cursor-default flex items-center'><img src="logo.png" width={45} alt="" />LockIN</h2>
        {/* <a href="" className='hover:bg-gray-800 p-2 rounded-xl flex items-center'><img src="linkedin.webp" width={35} alt="" /> Linkedin</a> */}
        <button className={`${props.theme? "hover:bg-gray-800" : "hover:bg-white"} p-2 rounded-xl flex items-center cursor-pointer`} onClick={changetheme}>{props.theme? "Light Mode": " Dark Mode"}</button>
    </nav>
  )
}

export default Navbar
