import {useRef, useState} from 'react'

function App() {

  const apiKey = "c35227838b0e36fde75b6aa73313cbf3";
  const textRef = useRef()
  const [states, setStates] = useState(['','','','','',''])

  function HandleData() {
    const cityName = textRef.current.value
    textRef.current.value = null;
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + cityName + '&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
      const code = data["cod"];
      if(code >= 200 && code <= 299) {
        setStates([cityName, data["weather"][0]["main"], data["main"]["temp"], 'City', 'Weather', 'Temperature'])
      } else {
        setStates(['City ' + cityName + ' not found', '', '', '', '', ''])
      }
    })
  };

  return (
    <>
      <h2>Current Weather</h2>
      <div>
        City name: {' '}
        <input ref={textRef} type="text"></input>
      </div>
      <button onClick={HandleData}> Find </button>
      <table>
        <tr>
          <th>{states[3]}</th>
          <th>{states[4]}</th>
          <th>{states[5]}</th>
        </tr>
        <tr>
          <td>{states[0]}</td>
          <td>{states[1]}</td>
          <td>{states[2]}</td>
        </tr>
      </table>
    </>
  );
}

export default App;