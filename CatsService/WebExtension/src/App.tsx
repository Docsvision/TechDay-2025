import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('');
  const [count, setCount] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    loadData()
  }, []);

  async function loadData() {
    try {
        const countResponse = await fetch('/count');
        const count = await countResponse.json();
        const catsResponse = await fetch(`/cats/${count}`);
        const cats = await catsResponse.json();
        setCats(cats);
        

        const colorResponse = await fetch('/color');
        const color = await colorResponse.text();
        setColor(color);
        setCount(count);
        
    } catch (error) {
        console.error('Error:', error);
    }
}


  const renderCats = () => {
    return (
      <div className="cats__scroll-container">
        <div className="cats__container">
          {...cats.map((cat: string, index: number) => (
            <img className="cat" src={cat} key={index}/>
          ))}
        </div>
        
      </div>
    )
}

  return (
    <div className="App">
      <div className="App-header" style={{color: color.replaceAll(`"`, "")}} id="color">
        {<div key={color}>Мы &#10084; Консоль управления и котиков</div>}
      </div>
      <div ref={bodyRef} className="body">
          {renderCats()}
        
      </div>
    </div>
  )
}

export default App
