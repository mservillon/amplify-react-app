import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify'

export const BornOn = () => {

    const [born, updateBorn] = useState([]);

    const [loading, updateLoading] = useState(true);

    useEffect(() => {
        fetchName();
      }, []);
    
    
      const fetchName = async() => {
        updateLoading(true);
        const nameData = await API.get('cryptoapi', '/born');
        updateBorn(nameData.born);
        updateLoading(false);
      }

      let date = (born.created_at);
      let currentDate = new Date(date);
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();
      let year = currentDate.getFullYear();
      let prettyDateFormat = month + "/" + day + "/" + year;

    return (
        <>
        {loading && <h1>Loading data for GitHub user...</h1>}
        {!loading && <h3>The GitHub user {born.login} was made on {prettyDateFormat} !! 
        <br/>
        <img src="https://avatars.githubusercontent.com/u/119347806?v=4" 
        alt="mservillon's github pfp"/>
        </h3>
        }
        </>
    )
}

