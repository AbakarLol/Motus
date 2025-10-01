import { useState } from "react";
import Auth from "./Auth";
import Footer from "./Footer";
import Game from "./Game";
import Header from "./Header";





export default function App(){

    const [isAuthenticated, setAuthenticated] = useState(false);

    function callBack(value){
        setAuthenticated(() => {
            return value;
        })
    }


    return (
        <div className="">
            <Header />
            {
            isAuthenticated? 
            <Game />
            :
            <Auth callBack = {callBack} />
            }
            {/* <Footer /> */}
        </div>
    )
}