import { Snowfall } from "../../../src/index";
import "./App.css";

function App() {
  return (
    <div className='container'>
      <Snowfall
        snowflakeCount={150}
        fallSpeed={3.5}
        flakeSize='mix'
        opacity={1}
        flakeShape='❄️'
      />
      <div className='content'>
        <h1 className='animatedTitle'>Animated Snow Effects</h1>
      </div>
    </div>
  );
}

export default App;
