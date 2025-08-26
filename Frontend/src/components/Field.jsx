import { useRef, useEffect, useState } from "react"
import axios from 'axios';

export default function Field(){
    const [words, setWords] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef([]);
    const [w, setW] = useState([["a", "b", "f"], ["c", "d", "g"]])

    async function fetchWords(){  
        try{
            const response = await axios.get("https://trouve-mot.fr/api/size/4/4");
            const result = response.data
            const adaptedResult = result.map(word => [word.name.toUpperCase().split("")])
            console.log(adaptedResult)
            setWords(adaptedResult)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(inputRef)
        fetchWords();
        console.log("my words: " + words)
        inputRef.current[0]?.focus()
        
    }, [] )

    function handleChange(event){
        const [, inputIndex] = event.target.name.split("-");
        let refIndex = parseInt(inputIndex, 10);
        console.log(event.target.name)
        setInputValue(event.target.value);
        console.log(inputValue)

        if(refIndex < 3){
            inputRef.current[refIndex+1].focus()

        }else{
            // const endOfIndex = document.querySelector(`Input[name="code-${refIndex}]"`);
            // endOfIndex.blur()
            inputRef.current[3].focus()

        }

    }

    

    return(
        
        <div className="card lg:h-1/2 md:w-150 w-full  h-1/3">
            {             
                w.map((singleWord, wordIndex)=>{
                    return(
                        <div key={wordIndex}>
                            {
                                w[wordIndex].map((letter, index) =>  (<h2 className="text-blue-500" key={index}>Hello World</h2>) )
                            }
                        </div>
                    )
                })
                
            }
        </div>
    )
}