import React, { useState, useEffect } from 'react'

function Timer(props) {
    const { correctWords, startCounting } = props
    const [timeElapsed, setTimeElapsed] = useState(0)
    //rerender every second
    useEffect(() => {
      let id
      if(props.startCounting) {
        id = setInterval(() => {
          setTimeElapsed(oldTime => oldTime + 1) 
        }, 1000)
      }
      return () => {
        clearInterval(id)
      }
    }, [startCounting])
  
    const minutes = timeElapsed / 60
  
    return <div className='stats'>
        <span className='time'>Time: {timeElapsed}s</span>
        <span className='speed'>Speed: {((correctWords / minutes) || 0).toFixed(2)} wpm</span>
      </div>
  
  }

export default Timer