import { useEffect, useState } from 'react'
import GameOver from './GameOver'
const App = () => {
  const [color , setColor] = useState()
  const [guesses, setGuesses] = useState([])
  const [status, setStatus] = useState('')
  const [passed, setPassed] = useState(0)
  const [failed, setFailed] = useState(0)
  const [gOver, setGOver] = useState(false)
  function timeout(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
  const randomColor = () =>{
    return '#'+Math.floor(Math.random()*16777215).toString(16).toUpperCase()
  }
  const shuffleColors = (actualColor) =>{
    let arr = [actualColor, randomColor(),randomColor()].sort(() => Math.random() - 0.5)
    setGuesses(arr)
  }
   const handleClick = async (value) => {
    if(value === color){
      setStatus('Correct!')
      setPassed(passed + 1)
      await timeout(750)
      handleStart()
    }else{
      setStatus('Wrong!')
      if(failed >= 4){
        setGOver(true)
      }
      setFailed(failed + 1)
    }
  }
  const handleStart = () =>{
    setStatus('Guess the color!')
    let actualColor = randomColor()
    setColor(actualColor)
    shuffleColors(actualColor)
  }
  const handleRestart = () =>{
    setPassed(0)
    setFailed(0)
    setGOver(false)
    handleStart()
  }
  useEffect(() => {
    handleStart()
  }, [])

  useEffect(() => {
    const highest = localStorage.getItem('highest')
    if(highest){
      if(passed > parseInt(highest)){
        localStorage.setItem('highest', JSON.stringify(passed))
      }
      else{
        console.log(passed);
        console.log(parseInt(highest));
      }
    }
    else localStorage.setItem('highest', '0')


  },[gOver])
  
  return(
    <div className='App'>
      <div className="board">
        <p className='board-text correct'> Correct: {passed}</p>
        <p className='board-text false'>Wrong: {failed}</p>
      </div>
      <div style={{background : color}} id="color-box"></div>
      <div className="btns">
        {
          guesses.map((guess,index) => {
            return <input type="button"
            onClick={() => handleClick(guess)}
            key={index} 
            value={guess} />
          })
        }
      </div>
      <p className={status === 'Correct!' ? 'correct status':
                    status === 'Guess the color!' ? 'guess status' : 'false status'}>
                    {status}</p>
      {gOver && <GameOver setGOver={setGOver} score={passed} handleRestart={handleRestart} highest={parseInt(localStorage.getItem('highest'))}/>}
    </div>
  )
}

export default App
