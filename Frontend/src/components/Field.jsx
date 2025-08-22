import { useRef, useEffect } from "react"

export default function Field(){

    const inputRef = useRef();

    useEffect(() => {
    console.log(inputRef)
    inputRef.current.focus();
    }, [] )

    return(
        
        <div className="card lg:h-1/2 md:w-150 w-full  h-1/3">
            <input ref={inputRef} className="letter-input" type="text" maxLength="1" />
            <input className="letter-input" type="text" maxLength="1"   />
            <input className="letter-input" type="text" maxLength="1"   />
            <input className="letter-input" type="text" maxLength="1"   />

        
        </div>
    )
}