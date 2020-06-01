import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSpeechSynthesis } from "react-speech-kit";
import Button from "./Button";



const whatDay = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function getAvailableVoice(lng) {
    if (!window) return null;
    const synth = window.speechSynthesis;
    if (!synth) return null;
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
    const [pitch, setPitch] = useState(props.pitch);
    const [ruVoice, setRuVoice] = useState(null);
    const [enVoice, setEnVoice] = useState(null);
    const [voice, setVoice] = useState(enVoice);
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const changedLang = () => {
        if (props.lang === 'en') setVoice(enVoice);
        else setVoice(ruVoice);
    };
    const stopPlaying = props.stopPlaying ? props.stopPlaying : null;
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
    }, [props.openData, props.lang, cityInfo]);
    useEffect(() => {
        changedLang();
        // eslint-disable-next-line
    }, [props.lang]);
    useEffect(() => {
        if (props.play && !speaking && voice) speakWeather();
        // eslint-disable-next-line
    }, [props.play, voice]);
    useEffect(() => {
        if (props.pitch >= 0) setPitch(props.pitch);
        // eslint-disable-next-line
    }, [props.pitch]);
    useEffect(() => {
        if (props.stop && stopPlaying) {
            cancel();
            stopPlaying();
        }
        // eslint-disable-next-line
    }, [props.stop]);
    const speakWeather = () => {
        if (speaking) {
            cancel();
            stopPlaying();
        } else speak({ text: value, voice: voice, pitch: pitch  });
    };    
  
    return (
        <Button 
            onClick={speakWeather}
            className={'audio__play ' + (speaking ? 'speaking' : '')}
            icon={speaking ? 'stop-circle' : 'play-circle'}
            iconClass={speaking ? 'speaking' : ''}
            tooltip={{id: 'listen-weather', text: t('Listen today\'s weather')}}
            testId={'audio-play'}
        />
    );
}

export default SpeechSyn;
