import React, { useState, useEffect } from 'react';
import {useAuth} from '../context/AuthContext'

function Loader() {
  const [dots, setDots] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const {isLoading} = useAuth()

  return <h1 className='text-light'>Loading...</h1>;
}

export default Loader;