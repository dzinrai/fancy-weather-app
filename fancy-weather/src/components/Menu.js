import React from 'react';
import Button from './Button';
import { useTranslation } from 'react-i18next';


function Menu(props) {
  const opened = props.opened;
  const { t } = useTranslation();

  return (
    <div className={'menu ' + (opened ? 'opened' : '')}>
      <Button 
        icon='cog' 
        className='settings__switch' 
        onClick={props.onClickArray[0]}
        tooltip={{text: t('Settings'), id: 'settings'}}
      />
      <Button 
        icon='sync-alt' 
        className='animation__switch' 
        animClass=''
        animate={props.animationOn}
        onClick={props.onClickArray[1]}
        tooltip={{text: t('Animation'), id: 'animation'}}
      />
      <Button 
        icon={props.night ? ['far', 'moon'] : ['fas', 'moon']}
        className='light__switch' 
        onClick={props.onClickArray[2]}
        tooltip={{text: t('Night mode'), id: 'night__mode'}}
      />
      <Button 
        icon={'street-view'}
        className='mapStyle__switch' 
        onClick={props.onClickArray[3]}
        tooltip={{text: t('Street view'), id: 'street'}}
      />
      <Button 
        icon={'satellite'}
        className='mapStyle__switch' 
        onClick={props.onClickArray[4]}
        tooltip={{text: t('Satellite view'), id: 'satellite'}}
      />
    </div>
  );

}

export default Menu;