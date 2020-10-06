import React from 'react';

const Header = ({name}) => {
    return(
      <h2>{name}</h2>
    )
}

const Part = ({name, exercises}) => {
    return(
      <>
        <p>{name} {exercises}</p>
      </>
    )
}
  
const Content = ({parts}) => {
    return(
      <>
        {
          parts.map(part => 
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )
        }
      </>
    )
}

// using reduce method
const Total = ({parts}) => {
    const total = parts.reduce((total, part) => {
      total += part.exercises;
      return total;
    }, 0)
    return(
      <p><b>Number of exercises {total}</b></p>
    )
}

const Course = ({course}) => {
    return(
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
}

export default Course