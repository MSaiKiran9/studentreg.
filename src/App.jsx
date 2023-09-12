import { useState } from 'react'
import './App.css'
import Gist from "./Gist"
import Navigation from './Navigation';
function App() {
  const { pagenumber, changePageNumber } = useState(0);
  return (
    <>
      <div id='some'><h1>Student Form 2023</h1>
        <Navigation /></div>
    </>
  )
}

export default App


