import React, { useEffect, useState } from 'react';
import { ScrambledTextProps } from "./ScrambledText.props";
import s from './ScrambledText.module.css';
import { prepareTransformationAttay } from './helpers/prepareTransformationArray';
import { setFrames } from './helpers/setFrames';

export interface IQueue {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({ value, slideLength = 2000}) => {

  let chars = '![]#____________![]#____________';
  let resolved: any; // resolve function from Promise
  let queue: IQueue[] = [];
  let frameRequest: number; // returns by requestAnimationFrame
  let frame = 0;
  let counter = 0;
  const [outputState, setOutputState] = useState('');

  // Entry point
  useEffect(() => next(), []);

  const next = () => {
    let prevText = value[ counter === 0 ? value.length - 1 : counter - 1 ];
    let newText = value[counter];
    setText( prevText, newText ).then(() => setTimeout(next, slideLength));
    counter = (counter + 1) % value.length;
  }

  const setText = (prevText: string, newText: string ) => {
    queue = prepareTransformationAttay(prevText, newText);
    cancelAnimationFrame(frameRequest);
    frame = 0;
    update();
    const promise = new Promise((resolve, _reject) => resolved = resolve);
    return promise;
  }

  const update = () => {
    const [output, complete] = setFrames(queue, chars, frame);
    setOutputState(output);
    complete === queue.length ? resolved() : frameRequest = requestAnimationFrame(update);
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