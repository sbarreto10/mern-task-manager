import React, { useState, useEffect } from 'react';
import {useAuth} from '../context/AuthContext'

function Loader() {
  {console.log("Loading");}

  const [dots, setDots] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const {isLoading} = useAuth()

  return <h1>Loading...</h1>;
}

export default Loader;