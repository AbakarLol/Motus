import Footer from "./Footer"
import Header from "./Header"
import Board from "./Board"
import Field from "./Field"
import { useState } from "react"
import Dialog from "./Dialog"
import Auth from "./Auth"



function App() {

  const [scoreData, setData] = useState({
    grille : 3,
    niveau : 0,
    marge : 6
  })

  const [openDialog, setOpenDialog] = useState(false)

  const callBack = (value) => {
    setData( (prev) => {
      return {
        grille : value.grille,
        niveau : prev.niveau + value.niveau,
        marge : value.marge
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
      <Board scoreData = {scoreData} />
      <Field 
        callBack = {callBack} 
        setDialog = {setDialog}
       />
      {openDialog && <Dialog  />} 
    </div>
    
    )
}

export default App
