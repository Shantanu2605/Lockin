import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [theme, settheme] = useState(false)

  return (
   <>
   <Navbar theme={theme} settheme={settheme} />
   
  
    {theme ?  <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> :
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
    }  <Home theme={theme} settheme={settheme}/>
  

   <Footer/>
   </>
  )
}

export default App
