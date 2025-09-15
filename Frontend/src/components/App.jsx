import Footer from "./Footer"
import Header from "./Header"
import Board from "./Board"
import Field from "./Field"
import Button from "./Button"
import { useState } from "react"



function App() {

  const [scoreData, setData] = useState({
    score : 0,
    niveau : 0,
    record : 6
  })

  const callBack = (value) => {
    setData( (prev) => {
      return {
        score : prev.score + value.score,
        niveau : prev.niveau + value.niveau,
        record : value.record
      }
    } )
  }
  

  return (
    <div className="main">
      <Header />
      <Board scoreData = {scoreData} />
      <Field callBack = {callBack} />
      <Footer />
    </div>
    
    )
}

export default App
