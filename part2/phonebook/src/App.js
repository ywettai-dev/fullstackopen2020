import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const hook = () => {
    personService
    .getAll()
    .then(initialData => {
      setPersons(initialData);
    });
  };

  useEffect(hook, []);

  const successText = message => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  }
  
  const errorText = (responseError, defaultError) => {
    const message = responseError.response.data ? `Error: ${responseError.response.data.error}` : defaultError
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  const addName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNum
    };
    // if the user already exists then check whether the user wants to update phone number or not
    // else create a new person
    const checkSameName = persons.map(person => person.name).indexOf(newName);
    if(checkSameName > -1) {
      const sameNameIndex = persons[checkSameName];
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      personService
      .update(sameNameIndex.id, personObject)
      .then(returnedObject => {
        setPersons(persons
          .map(person => person.id !== sameNameIndex.id 
            ? person 
            : returnedObject
          )
        );
        successText(`Updated ${newName} information`);
      })
      .catch(error => {
        errorText(`Information of '${newName}' was already removed from the server.`);
      })
    }else {
      personService
      .create(personObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject));
        successText(`Added ${newName} information`);
        setNewName('');
        setNewNum('');
      })
      .catch(error => {
        console.log(error.response.data.error)
        errorText(error, error.message)
      })
    }
  };

  const deleteNameOf = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        successText(`Deleted ${name} information`);
      })
      .catch(error => {
        errorText(`'${name}' has already deleted`);
      })
    }
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  return(
    <div>
      <h1>Phonebook</h1>
      <SuccessMessage message={successMessage}/>
      <ErrorMessage message={errorMessage}/>
      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new contact</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
       />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deleteNameOf={deleteNameOf}
      />
    </div>
  )
}

export default App;
