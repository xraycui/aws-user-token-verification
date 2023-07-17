import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './home-page.css'
import Search from '../components/search-com';
import SearchResults from '../components/search-results-com';
import { v4 as uuidv4 } from 'uuid'
import { switchMap } from 'rxjs/operators';
import { API_GATEWAY } from '../aws/apigateway'
import { from } from 'rxjs';
import axios from 'axios';

const Home = () => {
  
  const [searchResults, setSearchResults] = useState([])

  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    const results = []
    const subscription = from(axios(`${API_GATEWAY}get`, options))
      .pipe(
        switchMap((response) => response.data)
      )
      .subscribe((data) => {
        results.push(data)
        setSearchResults(results)
      });    
    return () => {
      subscription.unsubscribe();
    };
  },[])

  const navigate = useNavigate()

  const handleClickCreateButton = () => {
    navigate('/user', {state: {id: uuidv4(), firstName: '', lastName: ''}})
  }

  const handleClickSearchButton = (value) => {
    console.log('click search button', value)
  }

  return (
    <>
      <section>
        <p>[Create User]</p>
        <button onClick={handleClickCreateButton}>Create A New User</button>
      </section>
      <Search onClickButton={handleClickSearchButton} />
      <SearchResults searchResults={searchResults} />
    </>
  );
};

export default Home;
