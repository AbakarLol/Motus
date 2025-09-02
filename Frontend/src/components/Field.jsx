import { useRef, useEffect, useState } from "react"
import axios from 'axios';

export default function Field(){

    
    const [words, setWords] = useState([]);
    // const [inputValue, setInputValue] = useState("");
    const inputRef = useRef([]);
    const [size, setSize] = useState(3)
    let firstIndex = 0



    async function fetchWords(){  
        try{
            const response = await axios.get(`https://trouve-mot.fr/api/size/${size}/${size}`);
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
        const inputNameAttribute = `code-${firstIndex}`
        const firstLetter = document.querySelector(`Input[name=${inputNameAttribute}]`) 
        firstLetter.value = await words[firstIndex][firstIndex]
        inputRef.current[firstIndex + 1].disabled = false
        inputRef.current[firstIndex + 1]?.focus()   
        firstLetter.className = "bg-blue-600 letter-input m-1"
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

    function isIn(word, letter){
        let found = false
        for (let i = 0; i<= word.length; i++){
            if (word[i] == letter) {
                found = true
            }
        }
        return found

    }




    function handleChange(event){
        
        const [, wordIndex] = event.target.name.split("-");
        let refIndex = parseInt(wordIndex, 10);
        let [checkWordIndex, checkLetterIndex] = inputRef.current[refIndex].getAttribute("wordindex").split("-")
        checkWordIndex = parseInt(checkWordIndex, 10);
        checkLetterIndex = parseInt(checkLetterIndex, 10);
        let inputValue = event.target.value.toUpperCase()
        console.log(event.target.value)

        

        if(refIndex < (words.length * words.length) - 1 ){
            inputRef.current[refIndex+1].disabled = false
            inputRef.current[refIndex+1].focus()
            inputRef.current[refIndex].value = inputValue.toUpperCase()
                 
        }else{
            // const endOfIndex = document.querySelector(`Input[name="code-${refIndex}]"`);
            // endOfIndex.blur()
            inputRef.current[(words.length * words.length) - 1].blur()
            inputRef.current[refIndex].value = event.target.value.toUpperCase()
            setSize(size+1)
        }

        if(inputValue != words[checkWordIndex][checkLetterIndex]){
            if(isIn(words[checkWordIndex], inputValue)){
                inputRef.current[refIndex].className = "rounded letter-input  m-1 bg-[radial-gradient(circle_at_center,rgba(250,204,21,1)_70%,rgba(96,165,250,1)_71%)]" 
            }else{
                inputRef.current[refIndex].className = "bg-red-400 letter-input m-1"
            }      
        }else{ 
            inputRef.current[refIndex].className = 'letter-input m-1'
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
                                        wordindex = {`${singleWordIndex}-${index}`}
                                        onChange={handleChange}
                                        disabled={true}

                    
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