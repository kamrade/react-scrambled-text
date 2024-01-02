import React, { useEffect, useState } from 'react';
import { ScrambledTextProps } from "./ScrambledText.props";
import { prepareTransformationArray } from './helpers/prepareTransformationArray';
import { setFrames } from './helpers/setFrames';
import { IQueue } from './helpers/types';
import style from './ScrambledText.module.css';

export const ScrambledText: React.FC<ScrambledTextProps> = ({ 
  value, 
  slideLength = 4000, 
  postAnimate,
  postAnimateSensetivity = 4
}) => {

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
    queue = prepareTransformationArray(prevText, newText);
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

  const getAnimationClassName = () => {
    let sensitivity = postAnimateSensetivity < 4 ? 4 : postAnimateSensetivity;
    let randomIndex = Math.floor(Math.random() * sensitivity);
    return postAnimate
      ? `${style.togo} ${style['togo-' + randomIndex] || 'togo-empty'}`
      : '';
  }

  return (
    <div className={'ScrambledTextContainer'}>
      <div className={'ScrambledText'}>
        {outputState.split('').map((item, i) => (
          <span 
            className={getAnimationClassName()} 
            key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}