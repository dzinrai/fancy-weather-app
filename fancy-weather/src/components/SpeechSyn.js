import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSpeechSynthesis } from "react-speech-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";



const whatDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function getAvailableVoice(lng) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    let ruVoice;
    let enVoice;
    for (let i = 0; i < voices.length; i += 1) {
        if (voices[i].lang === 'ru-RU') {
            ruVoice = voices[i];
            break;
        }
    }
    for (let i = 0; i < voices.length; i += 1) {
        if (voices[i].lang === 'en-US') {
            enVoice = voices[i];
            break;
        }
    }
    if (lng === 'en') return enVoice;
    else return ruVoice;
}

function SpeechSyn(props) {
    const { t } = useTranslation();
    const day = new Date();
    const cityInfo = typeof props.cityInfo === 'string' ? props.cityInfo.split(',')[0] : '';
    const [value, setValue] = useState("");
    const [ruVoice, setRuVoice] = useState(null);
    const [enVoice, setEnVoice] = useState(null);
    const [voice, setVoice] = useState(enVoice);
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const changedLang = () => {
        if (props.lang === 'en') setVoice(enVoice);
        else setVoice(ruVoice);
    };
    useEffect(() => {
        changedLang();
        // eslint-disable-next-line
    }, [enVoice, ruVoice]);
    useEffect(() => {
        cancel();
        if (!ruVoice) setRuVoice(getAvailableVoice('ru'));
        if (!enVoice) setEnVoice(getAvailableVoice('en'));
        let text = '';
        text = text.concat(`${cityInfo}. `);
        text = text.concat(`${t(whatDay[day.getDay()])}. `);
        text = text.concat(`${props.openData.main.temp.toFixed(0)}°. `);
        text = text.concat(`${t(props.openData.weather[0].description)}. ${t('FEELS LIKE')} `);
        text = text.concat(`${props.openData.main.feels_like.toFixed(0)}°. ${t('Wind')} `);
        text = text.concat(`${props.openData.wind.speed.toFixed(0)} ${t('meters per second')}. `);
        text = text.concat(`${t('Humidity')} ${props.openData.main.humidity.toFixed(0)}%`);
        setValue(text);
        // eslint-disable-next-line
    }, [props.openData, props.lang]);
    useEffect(() => {
        cancel();
        changedLang();
        // eslint-disable-next-line
    }, [props.lang]);

    const speakWeather = () => {
        if (speaking) {
            cancel();
        } else speak({ text: value, voice: voice  });
    };
        
  
    return (
      <div>
        <textarea
          value={value}
          onChange={event => setValue(event.target.value)}
          className={props.hide ? 'hidden' : ''}
        />
        <button onClick={speakWeather} className={'audio__play ' + (speaking ? 'speaking' : '')} data-tip data-for='listen-weather'>
            <FontAwesomeIcon icon={speaking ? 'stop-circle' : 'play-circle'} className={speaking ? 'speaking' : ''} />
        </button>
        <ReactTooltip id={'listen-weather'} type='error' className='tooltip1'>
            <span>{t('Listen today\'s weather')}</span>
        </ReactTooltip>
      </div>
    );
}

export default SpeechSyn;
