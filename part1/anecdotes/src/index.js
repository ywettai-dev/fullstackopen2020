import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const MaxVotes = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const voteIndex = votes.indexOf(maxVotes);
  if(maxVotes === 0) {
    return (
      <div>
        <p>No votes yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>"{anecdotes[voteIndex]}" has {votes[voteIndex]} votes.</p>
    </div>
  )
  
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(6));

  const randomNum = Math.random();
  
  const randomAnecdote = Math.floor(randomNum * anecdotes.length);
  
  const handleSelected = () => {
    setSelected(randomAnecdote);
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }
 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <div>
        <Button handleClick={handleVote} text='vote'/>
        <Button handleClick={handleSelected} text='next anecdote'/>
      </div>
      <MaxVotes anecdotes={anecdotes} votes={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));