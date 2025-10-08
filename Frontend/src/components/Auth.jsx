import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Auth(){
    const [user, setUser] = useState({
        username : "",
        password : "",
        passwordConfirmation : ""
    });

    const [exist, setExist] = useState(true);

    const [message, setMessage] = useState();

    const [userFound, setFound] = useState();

    const [isAuthSucceed, setAuthSucceed] = useState(false);

    const navigate = useNavigate()

    let base = import.meta.env.VITE_backend_Url;


function handleChange(event){
   const {name, value} = event.target;
   setUser((prev) => {
    return ({...prev, [name]: value })
   });
}

async function handleClick(){
    try{
        const response = await axios.post(`${base}/login`,  {
        username: user.username,
        password: user.password
    },
    {
        withCredentials:true
    }
)
    const returnedData = response.data;
    setMessage(<p className="text-red-400 text-sm sm:text-md" > {returnedData.text} </p>)
    setFound(returnedData.userExist)
    setAuthSucceed(returnedData.authSucceed);
    
      if(returnedData.authSucceed){
        navigate("/")
    }

    console.log(response.data);
    }
    catch(error){
        console.log(error);
    }
    
}

async function handleSigningUP() {
    if(user.password === user.passwordConfirmation){
        try {
        const response = await axios.post(`${base}/signup`, {
            username : user.username,
            password : user.password
        })
        console.log(response)
        } catch (error) {
            console.log(error)
        }
    }else{
        console.log('confirm your password')
    }
    
    
}

function handleExist(){
    setExist((prev) => {
        return !prev
    })
}


    return(
        <div className="flex justify-center items-center mt-10 w-full h-[80vh] ">
            <div className="gradient card sm:w-120 h-120 w-80 flex flex-col justify-arround items-start px-3 sm:px-4 py-15 sm:rounded-2xl rounded-xl" >
                
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Username:</label>
                    <input onChange={handleChange} value={user.username} type="text" name="username" className="auth-input" />
                    {!isAuthSucceed && !userFound? message : "" }
                </div>
                <div className="w-full">
                    <label className="pl-1" htmlFor="">Password:</label>
                    <input onChange={handleChange} value={user.password} type="password" name="password" className="auth-input" />
                    {!isAuthSucceed && userFound? message : "" }
                </div>
                {!exist && <div className="w-full">
                    <label className="pl-1" htmlFor="">Confirm Password:</label>
                    <input onChange={handleChange} value={user.passwordConfirmation} type="password" name="passwordConfirmation" className="auth-input" />
                </div>}
                {
                exist?
                <button
                onClick={handleClick} 
                className="bg-[#bc4e9c] hover:bg-[#fd2c72] w-full hover:text-lg h-10 text-amber-50 rounded-md border-2 border-[#bc4e9c]"  >
                Connecter
                </button>
                :
                <button
                onClick={handleSigningUP} 
                className="bg-[#bc4e9c] hover:bg-[#fd2c72] hover:text-lg w-full h-10 text-amber-50 rounded-md border-2 border-[#bc4e9c]"  >
                Enrégistrer
                </button>
                }   
                {exist?
                <div className="flex justify-center items-center flex-col text-center w-full mt-5">
                    <p className="text-justify" >Vous n'etes pas encore enrengistré alors, vous pouvez vous </p> 
                     <button className="text-[#bc4e9c] hover:text-[#fd2c72] hover:text-lg " onClick={handleExist} >Enrégistrer</button>
                </div>
                :
                <div className="flex justify-center items-center flex-col text-center w-full mt-5">
                    <p className="text-justify">Si vous etes déja enrengistré alors, vous pouvez vous </p> 
                    <button className="text-[#bc4e9c] hover:text-[#fd2c72] hover:text-lg" onClick={handleExist} >Connecter</button>
                </div>

                }

            
                


            </div>
           
        </div>
    )
}