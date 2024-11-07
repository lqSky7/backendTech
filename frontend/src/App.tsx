import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [countd, setCount] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/mes").then((res) => {
      setCount(res.data)
    })
  })


  return (
  <>

  <p>hi</p>
 
  <p>number of elements: {countd.length}</p>
  {
    
    
    countd.map((element, index) => (
      <div key={element.id}>
        <h2>{element.msg}hi</h2>
      </div>

    ))
  }
  </>
  )
}

export default App
