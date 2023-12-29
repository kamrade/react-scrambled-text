import './App.css'
import { ScrambledText } from './components';

function App() {
  let scrambledValues = [
    '[ Product design ]',
    '[ Prototyping ]',
    '[ Infographic ]',
    '[ Design systems ]',
    '[ React/Angular components ]',
    '[ Business and system analytics ]'
  ]

  return (
    <>
      <div className='App'>
        <div className="scrambledTextWrapper">
          <ScrambledText value={scrambledValues} />
        </div>
      </div>
    </>
  );

}

export default App
