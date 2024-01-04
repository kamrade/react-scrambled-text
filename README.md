# React Text Scrambler

Simple and reusable text slider with glitchy animation. Best used with monospaced fonts. Not styled. Inherits theme, colors, font-family, font-size, etc.

## Installation

The package can be installed via npm:

```bash
npm install @kamrade/react-scrambled-text --save
```

or via yarn:

```bash
yarn add @kamrade/react-scrambled-text
```

## Example

```bash
import { ScrambledText } from '@kamrade/react-scrambled-text';

const value: string[] = [ 'Establish communication', 'Connecting to the server', 'Loading data'];

<ScrambledText
   value={value}
   slideLength={2000}
   postAnimate
   postAnimateSensetivity={50}
>
```

value = text for rendering
slideLength = how long each slide will be visible
postAnimate = after each slide change animation can be extended. Or not
postAnimateSensetivity = play with this number to diferenciate post animation. Less number – more detailed animation

## Roadmap

### Components

- [ ] Mosaic component
- [ ] Typewriter

### Text Scrambler

[ ] -
