import Auth from "./Auth";
import Footer from "./Footer";
import Game from "./Game";
import Header from "./Header";


export default function App(){
    return (
        <div className="main">
            <Header />
            {/* <Game /> */}
            <Auth />
            <Footer />
        </div>
    )
}