import React, {useState} from "react";
import './verification-page.css'
import { useLocation, Link, json } from "react-router-dom";

const Verification = () => {
    const [inputToken, setInputToken] = useState('')
    const [message, setMessage] = useState('[Verification Result] Token has not verified yet')
    const location = useLocation()
    const user = location.state || {}

    const handleInputChange = (event) => {
        setInputToken(event.target.value)
        console.log(inputToken)
    }

    const handleClickVerifyButton = () => {
        let verifyResult
        const userToVerify = {
            id: user.id,
            firstName,
            lastName,
            token: inputToken
          }
      
          axios.get(`${API_GATEWAY}verify`, userToVerify)
          .then(response => {
            verifyResult = JSON.parse(response).body.result
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
          });
    
        verifyResult ? setMessage(`[Verification Result] ${token} is a valid token`) : setMessage(`[Verification Result] ${token} is not a valid token`) 
    }

    return (
       <> 
            <section className="user-profile">
                <p>[Verify User Token]</p>
                <label>ID: {user.id}</label>
                <label>First Name: {user.firstName}</label>
                <label>Last Name: {user.lastName}</label>
            </section>
            <section>
                <input type="text" placeholder="Token" onChange={event => handleInputChange(event)}/>
                <button onClick={handleClickVerifyButton}>Verify Token</button>
                <p>{message}</p>
            </section>
            <section>
                <Link to='/'>Back to Home Page</Link>
            </section>
        </>
    )
}

export default Verification