import {useEffect } from "react";
import Auth from "./Auth";
import Game from "./Game";
import Header from "./Header";
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from "axios";





export default function App(){


    const navigate = useNavigate();

    useEffect(()=>{
        const init = async () => {
            const response = await axios.get('http://localhost:3000/game', {
                withCredentials: true
            });
            if(!response.data.authSucceed){
                navigate("/auth")
            }
            
        }

        init()
    }, [])


    return (
        <div className="">

            
            
            {/* <Footer /> */}

            <Routes>
                <Route exact path={'/auth'} element={<Auth />} /> 
                <Route exact path={'/'} element= {
                    <div>
                        <Header />
                        <Game />
                    </div>
                } 
                /> 
            </Routes>
        </div>
    )
}