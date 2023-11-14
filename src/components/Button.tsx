import { useState } from 'react';
import "../index.css";
import "./Button.css";

export const Button = () => {

  const [ counter, setCounter ] = useState<number>(0);

  const onClick = () => {
    setCounter(counter + 1);
    console.log("Vite + React + TypeScript + TailwindCSS", counter);
  };

  return (
    <button onClick={onClick} className='Button-calendar bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
      Vite is better than webpack
    </button>
  );
}