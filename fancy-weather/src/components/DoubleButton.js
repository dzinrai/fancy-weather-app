import React, { useEffect } from 'react';
import Button from './Button';

function DoubleButton(props) {
  const units = props.units;
  useEffect(() => {
    if (['imperial','metric'].includes(props.units)) localStorage.setItem('units', props.units ? props.units : 'metric');
  }, [props.units]);

  return (
    <div className='double-btn__container'>
      <Button 
        className={'foren__switch ' + (units === 'imperial' ? 'active' : '')}
        text='°F' 
        onClick={props.onClick[0]} />
      <Button 
        className={'celci__switch ' + (units === 'metric' ? 'active' : '')}
        text='°C' 
        onClick={props.onClick[1]} />
    </div>
  );
}

export default DoubleButton;