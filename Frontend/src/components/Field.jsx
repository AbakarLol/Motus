import { useRef, useEffect, useState} from "react"
import axios from 'axios';

export default function Field({callBack}){

    const [words, setWords] = useState([]);
    // const [inputValue, setInputValue] = useState("");
    const inputRef = useRef([]);
    const [size, setSize] = useState(3)
    const [backspacePressed, setBackspace] = useState(false)
    const [errors, setErrors] = useState(false)
    const [round, setRound] = useState(1)
    // const [firstIndex, setFirstIndex] = useState(0)
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




    async function giveFirstHint(checkWordIndex, checkLetterIndex) {
        if(firstIndex == 0){
            checkWordIndex = 0 
            checkLetterIndex = 0
        }
        const inputNameAttribute = `code-${firstIndex}`
        const firstLetter = document.querySelector(`Input[name=${inputNameAttribute}]`) 
        firstLetter.value = await words[checkWordIndex][checkLetterIndex]
        handleAutoFocus(firstIndex)                                 // after giving the first hint the focus is in the next element but if the next element is in correcting state with Backspace keydown that mean we should stay focused in this element
        firstLetter.className = "bg-blue-600 letter-input m-1"
        inputRef.current[firstIndex].setAttribute("correct", "true");   // this will change the correct atribute from false to true, its important to check and handle wrong guesses
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





    useEffect(() => {

        const init = async ()=>{
            if(size > 3){
                await setWords()                                            // the words state should be cleaned in order to reinitialize and rerender the compenent with empty inputs 
                inputRef.current = []                                       // the Ref that track the inputs should be cleaned to track the new inputs rendered to compare with the right letters this why it should wait for the words reintialisation
                updateLevel()
            }
            
        }

        init()

    }, [size])


    // useEffect(() => {

    //     const init = async () => {
                
    // }

    // init()

    // }, [errors] )





    function isIn(word, letter){
        let found = false
        for (let i = 0; i<= word.length; i++){
            if (word[i] == letter) {
                found = true
            }
        }
        return found

    }





    function handleAutoFocus(refIndex){         // Backpace erase the current element value but the element should be focused to wait for next value otherwise the next elment should be focused

        inputRef.current[refIndex].addEventListener('keydown', (event)=> {
                if(event.key === 'Backspace'){
                    setBackspace(true)          // Backpased tracked by this state if it is pressed then this state turn to true otherwise it is false
                    
                }    
            })

            if(backspacePressed){
                inputRef.current[refIndex].focus()
                setBackspace(false)
            }else{
                inputRef.current[refIndex+1].disabled = false
                inputRef.current[refIndex+1].focus()
            }
    }





    async function updateLevel(){
        // call api for another set of words with updated size
        await fetchWords()
        
    }




    function checkAllInputsCorrect(){
        const numberOfInput = (words.length * words.length) ;
        var isAllCorrect = true
        for(let i=0; i<numberOfInput; i++ ){
            if((inputRef.current[i].getAttribute("correct") === "false")){
                isAllCorrect = false
            }
        }
        return isAllCorrect
    }





   async function handleChange(event){
        
        const [, wordIndex] = event.target.name.split("-");
        let refIndex = parseInt(wordIndex, 10);
        let [checkWordIndex, checkLetterIndex] = inputRef.current[refIndex].getAttribute("wordindex").split("-")
        checkWordIndex = parseInt(checkWordIndex, 10);
        checkLetterIndex = parseInt(checkLetterIndex, 10);
        let inputValue = event.target.value.toUpperCase()
        console.log(event.target.value)

        

        if(refIndex < (words.length * words.length) - 1 ){
            
            
            handleAutoFocus(refIndex)
            
            inputRef.current[refIndex].value = inputValue.toUpperCase()
            
            if (((refIndex + 1 ) % size ) === 0){                   // preventing that the next input will be a new word by calculating the modulo of the next index (refIndex + 1) by the size of the words
                console.log("size:" + size)
                firstIndex = refIndex +1                            // first index here mean the index of the hint or the first letter of the word to guess
                console.log("word end")            
                giveFirstHint(checkWordIndex +1, 0)                 // checkwordIndex and refIndex are still pointed in the last letter of the preview onchange we go the the next words that why the +1 and the first hint are always the first letter of the word which is located on [wordIndex][0]
                inputRef.current[firstIndex].blur()
            }
            
                 
        }else{
            // const endOfIndex = document.querySelector(`Input[name="code-${refIndex}]"`);
            // endOfIndex.blur()
            inputRef.current[(words.length * words.length) - 1].blur()
            inputRef.current[refIndex].value = event.target.value.toUpperCase()
            

            
            
            // if((checkAllInputsCorrect())){
            //     setRound(round + 1)
            //     firstIndex = 0
            //     lettersIndex = 0
            //     console.log('end of round')
            //     if(round === size){
            //         setRound(0) 
            //         setSize((prev) => {
            //             const newSize = prev + 1
            //             console.log("newSize:" + newSize)
            //             return newSize
            //         })
            //         setWords()
            

            //     }else{
            //         await setWords()                                            // the words state should be cleaned in order to reinitialize and rerender the compenent with empty inputs 
            //         inputRef.current = []                                       // the Ref that track the inputs should be cleaned to track the new inputs rendered to compare with the right letters this why it should wait for the words reintialisation
            //         updateLevel()                                               //  level update function should wait for the empty words reinitialization to finish
            //     } 
                                                             
                
                
            //     console.log("refIndex:" + refIndex + " and firstIndex:" + firstIndex)
            //     console.log("inputRef: " + inputRef.current.length)       
            //     return
                
                
            // }
        }

        
        if(inputValue != words[checkWordIndex][checkLetterIndex]){
            if(isIn(words[checkWordIndex], inputValue)){
                inputRef.current[refIndex].className = "rounded letter-input  m-1 bg-[radial-gradient(circle_at_center,rgba(250,204,21,1)_70%,rgba(96,165,250,1)_71%)]"
                 
            }else{
                inputRef.current[refIndex].className = "bg-red-400 letter-input m-1"
            }
            inputRef.current[refIndex].setAttribute("correct" ,"false");    
        }else{ 
            inputRef.current[refIndex].className = 'letter-input m-1'
            inputRef.current[refIndex].setAttribute("correct", "true"); 
             
        }


        if(checkAllInputsCorrect()){

            console.log('all inputs are corrects')

            lettersIndex = 0 
            firstIndex = 0
            
            // setErrors(checkAllInputsCorrect())

            setRound(round + 1) 
            
                if(round === size){
                    setRound(0) 
                    setSize((prev) => {
                        const newSize = prev + 1
                        console.log("newSize:" + newSize)
                        return newSize
                    })
                    setWords()
                    inputRef.current = [] 
            

                }else{
                    await setWords()                                            // the words state should be cleaned in order to reinitialize and rerender the compenent with empty inputs 
                    inputRef.current = []                                       // the Ref that track the inputs should be cleaned to track the new inputs rendered to compare with the right letters this why it should wait for the words reintialisation
                    updateLevel()                                               //  level update function should wait for the empty words reinitialization to finish
                }
                
                callBack({
                    score : size,
                    niveau : round,
                    record : size * round
                })

            

        }
        
       

    }

    let lettersIndex = 0

    
    return(
        
        <div className="card flex-col justify-center-safe gap-0.25 sm:gap-0.5 md:h-150 md:w-150 w-full h-1/2">
           
            {             
                words?.map((singleWord, singleWordIndex)=>{
                    
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
                                        correct = "false"
                                        
                                        

                    
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