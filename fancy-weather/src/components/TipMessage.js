import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

function TipMessage(props) {
    const { t } = useTranslation();
    const messageExist = props.message;

	if (messageExist && messageExist.listening) {
        const message = [];
        message.push(`"${t('Weather')}" - ${t('Listen audio weather')}\n`);
        message.push(`"${t('Stop')}" - ${t('Stop audio weather')}\n`);
        message.push(`"${t('Language')}" - ${t('Change language')}\n`);
        message.push(`"${t('Off')}" - ${t('Turn microphone off')}\n`);
		return (
			<div className="message__container error__log">
				<div className={"error-span"}>
                    {message.map((line, i) => 
                        <span key={i+1}>{line}</span>
                    )}
					<FontAwesomeIcon icon='times' onClick={props.clearMessage} className='close__btn' />
				</div>
			</div>
		);
	} else {
		return null;
	}

}

export default TipMessage;