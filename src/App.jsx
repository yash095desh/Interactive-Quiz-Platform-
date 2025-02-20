import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Quiz from './components/Quiz'
import Result from './components/Result'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/quiz" element={<Quiz/>}/>
      <Route path="/result" element={<Result/>}/>
      </Routes>
    </Router>
  )
}

export default App