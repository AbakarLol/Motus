import Footer from "./Footer"
import Header from "./Header"
import Board from "./Board"
import Field from "./Field"
import Button from "./Button"
import { useState } from "react"



function App() {

  const [scoreData, setData] = useState({
    score : 3,
    niveau : 0,
    record : 3
  })

  const callBack = (value) => {
    setData( () => {
      return value
    } )
  }
  

  return (
    <div className="main">
      <Header />
      <Board scoreData = {scoreData} />
      <Field callBack = {callBack} />
      <Button />
      <Footer />
    </div>
    
    )
}

export default App
