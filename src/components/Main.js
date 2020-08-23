import React, { useState } from 'react'
import YouTube from 'react-youtube';

const Main = (props) => {

    const [quoteTime, setQuoteTime] = useState(0);

    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const _onReady = (event) => {
        event.target.seekTo(quoteTime);
    }
    const playQuote = (offset) => {
        setQuoteTime(offset);
    }
    const formatTime = (time) => {
        if (time === 0) {
            return '0:00';
        }
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };


    return (
        <div className="main">
            <h2>{props.chosenSong.title}</h2>
            <YouTube id="player" videoId={props.youtubeId} opts={opts} onReady={_onReady} />
            <div className="quotes-div">
                {props.chosenSong.quotes ? <h1>Quotes</h1> : null}
                {props.chosenSong.quotes ? props.chosenSong.quotes.map(q => (<div className="quote" key={Math.random()}>
                    <svg width="30px" height="30px" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => playQuote(q.offset)}>
                        <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg>
                    <span>"{q.text}"</span><span><b>{formatTime(q.offset)}</b></span></div>)) : null}
            </div>
        </div>
    )

}

export default Main
