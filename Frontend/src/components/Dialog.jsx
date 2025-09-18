import denied from "/illustrations/denied.svg"
import Button from "./Button"


export default function Dialog(){
    return(
        
            
            <div className="card absolute top-1/4 z-10 shadow-5xl flex flex-col justify-center align-center gap-2 h-140 w-120 dialog" >
                <img src={denied} alt="denied illustration" className="h-60 w-60" />
                
                <div>
                    <h3> Vous avez expirez toutes les marges de tentative  </h3>
                </div>
                <Button />
            </div>
        
    )
}