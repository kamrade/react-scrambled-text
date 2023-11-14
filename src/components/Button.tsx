import { useState } from 'react';
import s from "./Button.module.css";

export const Button = () => {

  const [ counter, setCounter ] = useState<number>(0);

  const onClick = () => {
    setCounter(counter + 1);
    console.log("Vite + React + TypeScript + TailwindCSS", counter);
  };

  return (
    <button onClick={onClick} className={s.ButtonCalendar}>
      Vite is better than webpack
    </button>
  );
}