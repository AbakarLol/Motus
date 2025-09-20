import Button from "./Button"
import gameOver from "/illustrations/game_13745471.png"


export default function Dialog(){
    return(
        
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="card absolute top-1/4 z-10 shadow-5xl flex flex-col justify-center items-center gap-4 h-70 w-70 lg:h-100 lg:w-100 dialog" >
                <img src={gameOver} alt="denied illustration" className="h-30 w-30 lg:h-50 lg:w-50" />
                
                <div>
                    <h3 className="text-sm text-center" > Vous avez expirez toutes les marges de tentative  </h3>
                </div>
                <Button />
            </div>
            </div>
        
    )
}