import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify'

export const BornOn = () => {

    const [born, updateBorn] = useState([]);

    useEffect(() => {
        fetchName();
      }, []);
    
    
      const fetchName = async() => {
        const nameData = await API.get('cryptoapi', '/born');
        console.log(nameData);
        updateBorn(nameData.born);
      }

    return (
        <>
        <h3>The GitHub user {born.login} was made on {born.created_at}</h3>
        </>
    )
}

