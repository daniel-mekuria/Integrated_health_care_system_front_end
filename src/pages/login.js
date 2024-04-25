import React, { useState,useRef } from "react";
import "tailwindcss/tailwind.css";
import { Button } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Input from '@mui/joy/Input';
import bejingimg from '../assets/bejing.png'


const Login = () => {
  const [isLoginvisible, setIsLoginvisible] = useState(true);
  

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <img src={bejingimg} alt="no img" className="absolute top-[0%] left-[0%] w-full h-full" />
    <div className=" flex flex-col space-y-4 bg-[rgba(255,255,255,0.5)] justify-center backdrop-blur-md rounded-2xl p-4 w-fit h-fit" >
        <p className="font-manrope text-[2rem] self-center mb-8 font-medium text-gray-600">{isLoginvisible?"Welcome back":"Register"}</p>

        <div className="flex">
        <p className="font-sans text-black-600">{isLoginvisible?"Don't have an account":"Already registered"}</p>
        <Button  style={{ textTransform: 'none' }} className=" relative font-sans -top-[3px]"

        size="medium"
        variant="text"
         onClick={() => {
          document.activeElement.blur();


          setIsLoginvisible(!isLoginvisible)
        
        }}
      >
        Click here..
        </Button>
       
  
        

      </div>
  <div className="relative overflow-hidden w-96 h-80">
      <div className={`absolute w-full h-full transition-all  ease-in-out ${isLoginvisible ? "translate-x-0 duration-700" : "-translate-x-full duration-500"}`}   >
        <form className="space-y-7"> 
        <Input 
        placeholder="Username"
        startDecorator={<PersonIcon/>}
        variant="soft"
        required
        
        />
         <Input 
        placeholder="Password"
        startDecorator={<LockIcon/>}
        variant="soft"
        required
        type="password"
        
        />
        <div className="flex self-center justify-center py-7">
        <Button   
        variant="contained"
        className="w-40 "
        type="submit"
        >

          Login
        </Button>
        </div>
        </form>


      </div>
      

      <div className={`absolute w-full h-full transition-all  ease-in-out ${isLoginvisible ? "translate-x-full duration-500" : "-translate-x-0 duration-700 "}`}  >



      <form className="space-y-7"> 
        <Input 
        placeholder="Username"
        startDecorator={<PersonIcon/>}
        variant="soft"
        required
        
        />
         <Input 
        placeholder="Password"
        startDecorator={<LockIcon/>}
        variant="soft"
        required
        type="password"
        
        />
         <Input 
        placeholder="Repeat password"
        startDecorator={<LockIcon/>}
        variant="soft"
        required
        type="password"
        
        />
        
        <div className="flex self-center justify-center py-7">
        <Button  
        variant="contained"
        className="w-40 "
        type="submit"
        >

          Register
        </Button>
        </div>
        </form>

      </div>
    </div>

   
    </div>
    </div>

  );
};

export default Login;
