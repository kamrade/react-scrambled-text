/*
//
// - [ ] use declarative approach (get rid of useRef)
//
*/


import React, { useRef, useEffect } from 'react';
import { ScrambledTextProps } from "./ScrambledText.props";
import s from './ScrambledText.module.css';

export const ScrambledText: React.FC<ScrambledTextProps> = ({ value, slideLength = 2000}) => {

  const elRef = useRef<HTMLDivElement>(null);
  let chars = '![]#____________![]#____________';
  let resolved: any;
  let queue: any[] = [];
  let frameRequest: number;
  let frame = 0;
  let counter = 0;

  // Entry point
  useEffect(() => next(), []);

  // // renderer alternative
  // const nextInterval = () => {
  //   setInterval(() => {
  //     setText(value[counter]);
  //     counter = (counter + 1) % value.length;
  //   }, slideLength)
  // };

  // renders each phrase in a loop
  const next = () => {
    setText(value[counter]).then(() => setTimeout(next, slideLength));
    counter = (counter + 1) % value.length;
  }

  // set text
  const setText = (newText: string) => {
    let content   = (elRef.current && elRef.current.innerText) || '';          // получить текущий отображенный текст
    const length  = Math.max(content.length, newText.length);                  // установить максимальную длину для currentText и newText
    const promise = new Promise((resolve, _reject) => resolved = resolve);    // показывает resolved наружу
    queue = []; // сброс очереди символов

    for (let i = 0; i < length; i++) {
      const from   = content[i] || '';
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

  // отрисовка фрейма (кадра) на базе queue
  // каждый вызов пробегается по queue и, при необходимости, добавляет char в queue[i]
  // при этом остальные поля остаются статичными
  const update = () => {
    let output = '';  // базовое значение текста
    let complete = 0; // счетчик. максимальное значение = queue.length

    // в этом цикле генерируется строка, которая будет отображаться в текущем фрейме.
    // в зависимости от того, длина (в символах) какого фрейма больше, текст "вырастает" или "уменьшается"
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];

      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = randomChar();
          queue[i].char = char;
        }
        // TODO: move class or styles to component scope. Now you can find class definition in the addons.scss
        output += `<span class="dud">${char}</span>`;
        // output += `${char}`;

      } else {
        output += from;
      }
    }


    // положить новый текст в DOM
    if (elRef.current) {
      elRef.current.innerHTML = output;
    }

    // Если прошлись по всему queue, то пора заканчивать если нет, то идем дальше.
    complete === queue.length ? resolved()
      : frameRequest = requestAnimationFrame(update);
        frame++;

  }

  const randomChar = () => {
    return chars[Math.floor(Math.random() * chars.length)];
  }

  return (
    <div className={s.ScrambledTextContainer}>
      <div ref={elRef} className={s.ScrambledText}>

      </div>
    </div>
  );
}