import Footer from "./Footer"
import Header from "./Header"
import Board from "./Board"
import Field from "./Field"
import { useState } from "react"
import Dialog from "./Dialog"



function App() {

  const [scoreData, setData] = useState({
    score : 3,
    niveau : 0,
    record : 6
  })

  const [openDialog, setOpenDialog] = useState(false)

  const callBack = (value) => {
    setData( (prev) => {
      return {
        score : value.score,
        niveau : prev.niveau + value.niveau,
        record : value.record
      }
    } )
  }
  
  const setDialog = (value) => {

    setOpenDialog(() => {
      return value
    })

  }

  return (
    <div className="main">
      <Header />
      <Board scoreData = {scoreData} />
      <Field 
        callBack = {callBack} 
        setDialog = {setDialog}
       />
      {openDialog && <Dialog  />}
      <Footer />
    </div>
    
    )
}

export default App
