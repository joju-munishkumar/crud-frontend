import React from 'react'
import CRUD from './Components/CRUD'
import { ToastContainer } from 'react-toastify'
const App = () => {

// const str = "hey janeman mein hare krishna hare karishna"
// for(let i of str)

  return (
    <div>
      <CRUD/>
<ToastContainer position='top-center' autoClose={2000}/>


    </div>
  )
}

export default App
