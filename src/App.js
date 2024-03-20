import { useState } from 'react';

const width = 8
const candyColours = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] =useState([])


  const createBoard = () => {
    const randomColourArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)] //random colour from colours array
      randomColourArrangement.push(randomColour)
    }
  }

  createBoard()
  

  return (
    <div>
     
    </div>
  )
}

export default App
