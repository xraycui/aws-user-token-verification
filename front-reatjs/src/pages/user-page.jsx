import React, {useState} from "react";
import { useLocation, Link } from "react-router-dom";
import './user-page.css'
import axios from 'axios'
import { API_GATEWAY } from '../aws/apigateway'

const User = () => {
  const location = useLocation()
  const user = location.state || {}

  const [ lastName, setLastName ] = useState(user.lastName || '')
  const [ firstName, setFirstName ] = useState(user.firstName || '')

  const handleClickCreateButton = () => {
    const newUser = {
      id: user.id,
      firstName,
      lastName,
      token: user.id.substring(0, 5)
    }
    const header = {
      "Content-Type": "application/json"
    }
    axios.post(`${API_GATEWAY}create`, newUser, {header})
    .then(response => {
      // Handle success
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  }

  const handleClickUpdateButton = () => {
    const updatedUser = {
      id: user.id,
      firstName,
      lastName,
      token: user.id.substring(0, 5)
    }

    axios.put(`${API_GATEWAY}update`, updatedUser)
    .then(response => {
      // Handle success
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  }

  const handleClickDeleteButton = () => {
    const userToDelete = {
      id: user.id,
      firstName,
      lastName,
      token: user.id.substring(0, 5)
    }

    axios.delete(`${API_GATEWAY}delete`, userToDelete)
    .then(response => {
      // Handle success
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
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
        <p>[User Profile]</p>
      </section>
      <section>
        <label htmlFor="userid">ID:</label>
        <input className='userid' type="text" id="userid" value={user.id} readOnly/>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={handleFirstNameInputChange}/>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={handleLastNameInputChange}/>
        <button onClick={handleClickCreateButton}>Create</button>
        <button onClick={handleClickUpdateButton}>Update</button>
        <button onClick={handleClickDeleteButton}>Delete</button>
      </section>
      <section>
        <Link to='/'>Back to Home Page</Link>
      </section>
    </>
  )
}

export default User