import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNOS } from './constantes'
import { checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal.jsx'
import './App.css'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const[turno, setTurno] = useState(TURNOS.X)
  const[winner, setWinner] = useState(null)



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurno(TURNOS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turno
    setBoard(newBoard)

    const newTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurno(newTurno)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>3 IN ROW</h1>
      <button onClick={resetGame}>Reset</button>
      <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })
      }
      </section>

      <section className='turn'>
        <Square isSelected={turno === TURNOS.X}>
          {TURNOS.X}
        </Square>
        <Square isSelected={turno === TURNOS.O}>
          {TURNOS.O}
        </Square>
      </section>

      
      <WinnerModal resetGame={resetGame} winner={winner} />

    </main> 
  )
}

export default App
