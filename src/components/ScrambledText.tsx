import React, { useEffect, useState } from 'react';
import { ScrambledTextProps } from "./ScrambledText.props";
import s from './ScrambledText.module.css';
import { getRandomChar } from './getRandomChar';

export interface IQueue {
  from: any;
  to: any;
  start: any;
  end: any;
  char?: any;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({ value, slideLength = 1000}) => {

  let chars = '![]#____________![]#____________';
  let resolved: any;
  let queue: IQueue[] = [];
  let frameRequest: number;
  let frame = 0;
  let counter = 0;
  const [outputState, setOutputState] = useState('');

  // Entry point
  useEffect(() => next(), []);

  const next = () => {
    let prevText = value[ counter === 0 ? value.length - 1 : counter - 1 ];
    setText( value[counter], prevText ).then(() => setTimeout(next, slideLength));
    counter = (counter + 1) % value.length;
  }

  const setText = (newText: string, prevText: string) => {
    const length = Math.max(prevText.length, newText.length);
    const promise = new Promise((resolve, _reject) => resolved = resolve);
    queue = [];

    for (let i = 0; i < length; i++) {
      const from   = prevText[i] || '';
      const to     = newText[i] || '';
      const start  = Math.floor(Math.random() * 20);          // start и end – это рандомный промежуток
      const end    = start + Math.floor(Math.random() * 20);  // между 0 и 80, например [0,2], [10,25], [40, 80]
      queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(frameRequest);
    frame = 0; // сброс фрейма на 0
    update();
    return promise;
  }

  const update = () => {
    setOutputState('');
    let complete = 0;
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];

      if (frame >= end) {
        complete++;
        setOutputState((prevState) => prevState + to);
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = getRandomChar(chars);
          queue[i].char = char;
        }
        setOutputState((prevState) => prevState + char);

      } else {
        setOutputState((prevState) => prevState + from);
      }
    }

    // Если прошлись по всему queue, то пора заканчивать если нет, то идем дальше.
    if (complete === queue.length) {
      resolved();
    } else {
      frameRequest = requestAnimationFrame(update);
    }
    frame++;
  }

  return (
    <div className={s.ScrambledTextContainer}>
      <div className={s.ScrambledText}>
        {outputState.split('').map((item, i) => (
          <span className="togo" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}