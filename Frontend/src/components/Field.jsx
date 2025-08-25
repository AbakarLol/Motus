import { useRef, useEffect, useState } from "react"
import axios from 'axios';

export default function Field(){
    const [words, setWords] = useState([]);
    const inputRef = useRef();

    async function fetchWords(){  
        try{
            const response = await axios.get("https://trouve-mot.fr/api/size/4/10");
            const result = response.data
            const adaptedResult = result.map(word => word.name.toUpperCase())
            console.log(adaptedResult)
            setWords(adaptedResult)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(inputRef)
        inputRef.current.focus();
        fetchWords();
        console.log("my words: " + words)
    }, [] )

    return(
        
        <div className="grid grid-cols-10 grid-center card lg:h-1/2 md:w-150 w-full  h-1/3">
            <input ref={inputRef} className="letter-input" type="text" maxLength="1" />
        </div>
    )
}