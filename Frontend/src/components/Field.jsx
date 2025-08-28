import { useRef, useEffect, useState } from "react"
import axios from 'axios';

export default function Field(){

    
    const [words, setWords] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef([]);
    const [selectedWord, setSelected] = useState([])



    async function fetchWords(){  
        try{
            const response = await axios.get("https://trouve-mot.fr/api/size/4/4");
            const result = response.data
            const adaptedResult = result.map(word => [word.name.toUpperCase().split("")])
            console.log(adaptedResult)
            setWords(adaptedResult)
            const randomIndex = Math.round(Math.random() * 10);
            setSelected(result[randomIndex].name.toUpperCase().split(""))
            console.log("Selected Word :" + selectedWord)
        }catch(error){
            console.log(error)
        }
    }



    useEffect(() => {
        console.log(inputRef)
        fetchWords();
        console.log("my words: " + words)
        inputRef.current[0]?.focus()
        
    }, [])




    function handleChange(event){
        const [, wordIndex] = event.target.name.split("-");
        let refIndex = parseInt(wordIndex, 10);
        console.log(event.target.name)
        setInputValue(event.target.value);
        console.log(inputValue)

        if(refIndex < (words.length -1) * 2  ){
            inputRef.current[refIndex+1].focus()
        }else if(refIndex === words.length){
                refIndex = 0 
        
        }else{
            // const endOfIndex = document.querySelector(`Input[name="code-${refIndex}]"`);
            // endOfIndex.blur()
            inputRef.current[words.length * 2].blur()
            

        }

    }

    

    return(
        
        <div className="card flex-col justify-center-safe gap-2 j lg:h-1/2 md:w-150 w-full  h-1/3">
            {             
                words.map((singleWord, singleWordIndex)=>{
                    return(
                        <div key={singleWordIndex}>
                            {
                               
                                words.map((letter, index) =>  (
                                    
                                    <input 
                                        ref={(ref) => inputRef.current.push(ref)} 
                                        className="letter-input m-1" 
                                        type="text" 
                                        maxLength="1"
                                        key={index}
                                        name= {`code-${index}`}
                                        onChange={handleChange}
                                    />
                                    
                ) )
                            }
                        </div>
                    )
                })
                
            }
        </div>
    )
}