import React from 'react'
import "./ResetButton.css"

const ResetButton = ({ resetScore, resetBoard }) => {
    return (
      <>
      <button className='reset-btn' onClick={resetBoard}>Reset Board</button>
      <button className='reset-btn' onClick={resetScore}>Reset Score</button>
      </>
  )
}

export default ResetButton