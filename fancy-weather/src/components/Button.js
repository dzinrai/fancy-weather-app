import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

function Button(props) {
  const [animation, setAnimation] = useState('');
  const animClass = props.animClass;
  const tooltip = props.tooltip ? props.tooltip : false;

  useEffect(() => {
    if (props.animate) setAnimation(animClass);
    else setAnimation('');
  }, [props.animate, animClass]);

  return (
    <button
      className={props.className}
      onClick={props.onClick}
      type={props.type}
      value={props.value}
      data-tip={tooltip ? true : false}
      data-for={tooltip ? tooltip.id : null}
      data-testid={props.testId}
    >
      {props.icon && <FontAwesomeIcon
        icon={props.icon}
        className={props.iconClass + ' ' + animation}
      />}
      {props.text}
      {tooltip && <ReactTooltip id={tooltip.id} type='error' className='tooltip1'>
        <span data-testid={'tooltip1-' + (props.testId ? props.testId : '')}>{tooltip.text}</span>
      </ReactTooltip>}
    </button>
  );
}

export default Button;