import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ value, text }) => (
  <div>
    {text} {value}
  </div>
)

const Statistics = ({ good, neutral, bad, total, average, positive}) => {
  if(total === 0) {
    return(
        <p>No feedback given</p>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td><Statistic value={good} text='good'/></td>
          </tr>
          <tr>
            <td><Statistic value={neutral} text='neutral'/></td>
          </tr>
          <tr>
            <td><Statistic value={bad} text='bad'/></td>
          </tr>
          <tr>
            <td><Statistic value={total} text='all'/></td>
          </tr>
          <tr>
            <td><Statistic value={average} text='average'/></td>
          </tr>
          <tr>
            <td><Statistic value={positive} text='positive'/></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // clicks with their own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedBack = () => setGood(good + 1);

  const neutralFeedBack = () => setNeutral(neutral + 1);

  const badFeedBack = () => setBad(bad + 1);

  const totalScore = () =>  good + neutral + bad;

  const averageScore = () => (good-bad) / (good + neutral + bad);

  const positiveScore = () => good / (good + neutral + bad) * 100;

  return(
    <div>
      <h2>give feedback</h2>
      <Button handleClick={goodFeedBack} text='good'/>
      <Button handleClick={neutralFeedBack} text='neutral'/>
      <Button handleClick={badFeedBack} text='bad'/>
      <h2>statistics</h2>
      <Statistics 
      good={good} 
      neutral={neutral} 
      bad={bad} 
      total={totalScore()}
      average={averageScore()}
      positive={positiveScore()}
      />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
