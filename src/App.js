import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify'
import { BornOn } from './BornOn'
import './App.css';

function App() {
  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 })

  // create a variable for loading
  const [loading, updateLoading] = useState(true);

// Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
};

  const fetchCoins = async() => {
    updateLoading(true);
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`);
    updateCoins(data.coins)
    updateLoading(false);
  }

  useEffect(() => {
    fetchCoins();
  }, [])
  
  return (
    <div className="App">
      <input
          placeholder="start"
          onChange={e => updateInputValues('start', e.target.value)}  
      />
      <input
          onChange={e => updateInputValues('limit', e.target.value)}
          placeholder="limit"
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {loading && <h2>Loading...</h2>}
      {
        !loading && coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
      <BornOn />
    </div>
  );
}

export default App;
