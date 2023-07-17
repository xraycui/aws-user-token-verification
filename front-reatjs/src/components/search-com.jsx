import React, {useState} from 'react'
import './search-com.css'

const Search = ({onClickButton}) => {
 const [ lastName, setLastName ] = useState('')
  const [ firstName, setFirstName ] = useState('')
 
  const onClickSearchButton = () => {
    onClickButton({value: {lastName, firstName}})
  }

  const handleFirstNameInputChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameInputChange = (event) => {
    setLastName(event.target.value)
  }

  return (
    <>        
      <section>
        <p>[Search]</p>
        <div>
        <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={handleFirstNameInputChange}/>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameInputChange}/>
          <button onClick={onClickSearchButton}>Search</button>
        </div>
      </section>
    </>
  )
}

export default Search;
