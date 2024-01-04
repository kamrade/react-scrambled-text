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
        <div className="scrambledTextWrapper" style={{ opacity: '0.5'}}>
          <ScrambledText 
            value={scrambledValues} 
            slideLength={2000} 
            postAnimate 
            postAnimateSensetivity={10}
          />
          {/* <ScrambledText value={typewriterValues} /> */}
        </div>
      </div>
    </>
  );

}

export default App
