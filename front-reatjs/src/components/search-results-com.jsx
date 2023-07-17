import React from 'react';
import { useNavigate } from 'react-router-dom'
import './search-results-com.css';

const SearchResults = ({searchResults}) => {

  const navigate = useNavigate()
 
  const onClickVerifyTokenButton = (user) => {
    navigate('/verification', {state: user})
  }

  const onClickDetailButton = (user) => {
    console.log(user)
    navigate('/user', {state: user})
  }
  
  return (
    <section>
      <p>[Search Results]</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Token Verification</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>                
                <button onClick={() => onClickVerifyTokenButton(data)} >Verify Token</button>
              </td>
              <td>
                <button onClick={()=>onClickDetailButton(data)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SearchResults;