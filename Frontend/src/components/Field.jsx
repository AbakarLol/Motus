import { useRef, useEffect, useState } from "react"
import axios from 'axios';

export default function Field(){

    
    const [words, setWords] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef([]);
    const [selectedWord, setSelected] = useState([])
    let firstIndex = 0



    async function fetchWords(){  
        try{
            const response = await axios.get("https://trouve-mot.fr/api/size/4/4");
            const result = response.data
            // const adaptedResult = result.map(word => [word.name.toUpperCase()])
            let adaptedResult = []
            for (let i = 0; i < result.length; i++) {
                adaptedResult.push(result[i].name.toUpperCase().split(""));
                
            }
            console.log(adaptedResult)
            setWords(adaptedResult)
            
            // const randomIndex = Math.round(Math.random() * 10);
            // setSelected(result[randomIndex].name.toUpperCase().split(""))
            // console.log("Selected Word :" + selectedWord)
        }catch(error){
            console.log(error)
        }
        
    }

    async function giveFirstHint() {

        const firstLetter = document.querySelector("Input[name='code-0']") 
        firstLetter.value = await words[0][0]
        inputRef.current[1]?.focus()
        firstLetter.disabled = true
        
    }




    useEffect(() => {

        const init = async () => {
            console.log(inputRef)
            fetchWords()
            console.log("my words: " + words)
        }

        init();
    
    }, [])

    useEffect(()=>{
        if(words && words.length > 0){
            giveFirstHint()
        }
    }, [words])




    function handleChange(event){
        
        const [, wordIndex] = event.target.name.split("-");
        let refIndex = parseInt(wordIndex, 10);
        setInputValue(event.target.value);
        console.log(event.target.name)

        if(refIndex < (words.length * words.length) - 1 ){
            inputRef.current[refIndex+1].focus()
        }else{
            // const endOfIndex = document.querySelector(`Input[name="code-${refIndex}]"`);
            // endOfIndex.blur()
            inputRef.current[(words.length * words.length) - 1].blur()
        }
    }

    let lettersIndex = 0

    
    return(
        
        <div className="card flex-col justify-center-safe gap-2 j lg:h-1/2 md:w-150 w-full  h-1/3">
            {             
                words.map((singleWord, singleWordIndex)=>{
                    
                    return(
                        <div key={singleWordIndex}>
                            {
                               
                                words[singleWordIndex].map((letter, index) => { 
                                    return(
                                    
                                    <input 
                                        ref={(ref) => inputRef.current.push(ref)} 
                                        className="letter-input m-1" 
                                        type="text" 
                                        maxLength="1"
                                        key={index}
                                        name= {`code-${lettersIndex++}`}
                                        onChange={handleChange}

                    
                                    />
                                    
                                    
                )
                    }
            )
                       }
                        </div>
                    )

                })
                
            }
        </div>
    )
}