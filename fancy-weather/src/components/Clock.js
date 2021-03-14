import React, { useState, useEffect } from 'react';
import getLocaleTime from '../assets/getLocaleDate';

function Clock(props) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval( () => tick(), 1000 );
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  function tick() {
    setDate(new Date());
  }

  return (
    <span className="time">
      {getLocaleTime(props.countryTag, props.timezone, date)}
    </span>
  );

}

export default Clock;