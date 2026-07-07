import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid';

const Home = (props) => {

    const img = useRef();
    const pass = useRef();
    const [form, setform] = useState({ task: "", username: "", password: "" })
    const [array, setarray] = useState([])

    const getPasswords= async()=>{
        let req= await fetch("http://localhost:3000/")
        // let password = localStorage.getItem("password");
        let password= await req.json()
        console.log(password);
      
            setarray(password);

    }

    useEffect(() => {
        getPasswords();
        
    }, [])


    const eyeicon = () => {
        if (img.current.src.includes("eye.png")) {
            img.current.src = "eye-crossed.svg";
            pass.current.type = "text";


        }
        else {
            img.current.src = "eye.png";
            pass.current.type = "password";


        }

    }

     const savetoLS= ()=>{
    localStorage.setItem("password", JSON.stringify([...array, {...form, id: uuidv4()}]))
  }
  


    const copytext= (val)=>{
        let currtheme;
        if(props.theme){
            currtheme="light";
        }
        else{
            currtheme="dark"
        }
        toast.info('Copied to clipboard!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: currtheme,
});
        navigator.clipboard.writeText(val)
    }

    const savedata = async() => {
        console.log(form);
       

        }
         if(form.task==""){
                toast.error("Site field can't be empty!", {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: currtheme,
});


        }
        else{
         setarray([...array, {...form, id: uuidv4()}])
        let res= await fetch("http://localhost:3000/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify({...form, id: uuidv4()})});
        // localStorage.setItem("password", JSON.stringify([...array, {...form, id: uuidv4()}]))
        console.log([...array, form])
        setform({ task: "", username: "", password: "" });
          toast.success('Saved successfully!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: currtheme,
});
        }

    }

    const deleteitem= async(id)=>{
        let res= await fetch("http://localhost:3000/", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify({id})});
     let index= array.findIndex(item=>{
      return item.id==id;
    })
    const filtered = array.filter(item => item.id != id);
    setarray(filtered)
    
    // localStorage.setItem("password", JSON.stringify(filtered));
        
    }

    const handleedit= (id)=>{
        let index= array.findIndex(item=>{
      return item.id==id;
    })
     setform(array[index]);

    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })

    }

    return (
        
        <div className='pb-[75px] '>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

            <div className={`${props.theme? "text-white": "text-black"} w-[90%] md:w-[50%] mx-auto mt-8 flex flex-col gap-6 font-[Pliant]`}><div className='flex flex-col justify-center items-center'> <p className='text-center font-bold text-2xl font-[Montserrat] font-light'>Your own Password Manager</p><p className={`text-2xs font-thin ${props.theme? "text-white": "text-[#353535]"}`}>Secure with end to end encryption.</p></div>
                <div className='flex flex-col gap-1 w-[90%] md:w-[75%] mx-auto pb-10'><label htmlFor="task">What is it for?</label><input placeholder='e.g. Gmail/Phone password etc.' value={form.task} onChange={handlechange} name='task' type="text" className={`shadow-md ${props.theme? "shadow-emerald-500" : "shadow-amber-800"} w-full outline-none p-1 mx-auto bg-white text-black rounded-md`} /> <div className='flex w-full mt-4 justify-around items-center max-lg:flex-col max-lg:gap-2'><input value={form.username} placeholder='Username' name='username' onChange={handlechange} type="text" className={`shadow-md ${props.theme? "shadow-emerald-500" : "shadow-amber-800"}  w-[75%] md:w-1/3 p-1 outline-none bg-white text-black rounded-md`} />
                    <div className={`w-[75%] md:w-1/3 bg-white text-black rounded-md flex items-center px-1 shadow-md ${props.theme? "shadow-emerald-500" : "shadow-amber-800"}`}><input onChange={handlechange} value={form.password} type="Password" ref={pass} className=' p-1 w-[90%] outline-none' placeholder='Enter password' name="password" id="" /><img onClick={eyeicon} ref={img} src="eye.png" className='h-[25px] cursor-pointer' alt="" /> </div>
                    <button className={`flex items-center  px-2 py-1 hover:bg-[#39007e] hover:text-white cursor-pointer border-1 rounded-2xl max-lg:mt-2`} onClick={savedata}>Add <lord-icon
                        src="https://cdn.lordicon.com/vjgknpfx.json"
                        trigger="hover"
                    >
                    </lord-icon></button></div>
                </div></div>
                
            <div className='flex flex-col gap-7 mt-5'>
                <h3 className={`text-center ${props.theme? "text-white": "text-black"} font-[Montserrat] text-xl`}>Your details</h3>
                {array.length == 0 ? <div className={`mx-auto inline ${props.theme? "text-white": "text-black"} `}>Data will be shown here once added</div> :

                    <table className={`table-auto w-full md:w-[75%] text-center ${props.theme? "text-white": "text-black"} mx-auto font-[Montserrat] overflow-x-auto`}>
                        <thead>
                            <tr>
                                <th className='font-light'>Purpose</th>
                                <th className='font-light'>Username</th>
                                <th className='font-light'>Password</th>
                                <th className='font-light'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {array.map((item) => {
                                return <tr className='text-thin' key={item.id}>
                                
                                    <td className='font-[200] break-all'>{item.task}  </td>
                                    <td className='font-[200] break-all'><div className='flex justify-center items-center'><span className='hidden md:block'>{item.username} </span><lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json" className="[--lord-icon-primary:#a855f7] cursor-pointer" onClick={()=> {copytext(item.username)}}
                        trigger="hover"
                    >
                    </lord-icon></div></td>
                                    <td className='font-[200]'><div className="flex items-center justify-center"> <span className='hidden md:block'>{item.password}</span><lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json" className="[--lord-icon-primary:#a855f7] cursor-pointer" onClick={()=> {copytext(item.password)}}
                        trigger="hover"
                    >
                    </lord-icon></div></td>
                    <td><div className='flex justify-center items-center gap-2'>
                     <lord-icon onClick={()=>handleedit(item.id)}
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover" className=" rounded-lg cursor-pointer [--lord-icon-primary:#bf7efd] [--lord-icon-secondary:#bf7efd]" 
   >
</lord-icon>    <lord-icon onClick={()=> deleteitem(item.id)}
    src="https://cdn.lordicon.com/jzinekkv.json" className="brounded-lg cursor-pointer [--lord-icon-primary:#bf7efd] [--lord-icon-secondary:#bf7efd]"
    trigger="hover">
</lord-icon></div>
                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
    
                }
            </div>

        </div>




    )
}

export default Home
