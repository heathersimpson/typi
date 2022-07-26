import React, { useState, useRef, Text, useEffect } from 'react'
import './App.css'
import Word from './Word.js'
import Timer from './Timer.js'
import fetchQuote from './GetQuote'
import Axios from 'axios';


const getCloud = () => 'testing macbook windows hour cheese sandwich square money coin cork coding cloud grass love'.split(' ')


function App() {

  const [userInput, setUserInput] = useState('')
  // get words from wordcloud
  const cloud = useRef(getCloud())
  // set timer counter
  const [startCounting, setStartCounting] = useState(false)
  // highlight active word
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  // keep track of correct words
  const [correctWordArray, setCorrectWordArray] = useState([])

  // change the active word, check if word valid
  function processInput(value) {
    
    if(activeWordIndex === cloud.current.length) {
      return
      // stop the test
    }

    if(!startCounting) {
      setStartCounting(true)
    }

    if(value.endsWith(' ')) {

      if(activeWordIndex === cloud.current.length - 1) {
        // overflow, last word
        setStartCounting(false)
        setUserInput('Completed')
      } else {
        setUserInput('')
      }
      // the user has finished a word
      // increase active word index
      setActiveWordIndex(index => index + 1)

      // add correct word to array
      const word = value.trim()
      setCorrectWordArray(data => {
        const newResult = [...data]
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex]
        return newResult
      })
    } else {
      // otherwise, user input set to value
      setUserInput(value)
    }
  }

  return (
    <div>
      <h1 className='title'>typi</h1>

      <Timer 
        startCounting={startCounting}
        correctWords={correctWordArray.filter(Boolean).length}
      />

      <div className='actionbox'>
      <p className='wordbox'>{cloud.current.map((word, index) => {

        // display words from word cloud
        return <Word 
                className='wordbox'
                text={word}
                active={index === activeWordIndex}
                correct={correctWordArray[index]}
              />
    
      })}</p>
      <input
        className='typebox'
        type="text" value={userInput}
        onChange={(e) => processInput(e.target.value)} 
      />
      </div>
    </div>
  );
}

export default App;
