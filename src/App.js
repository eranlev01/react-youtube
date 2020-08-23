import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  useEffect(() => {
    getSongs();
  }, []);

  const [songs, setSongs] = useState([]);
  const [youtubeId, setYoutubeId] = useState('');
  const [songId, setSongId] = useState(0);
  const [chosenSong, setChosenSong] = useState({});
  const [errMsg, setErrMsg] = useState('');

  const getSongs = async () => {
    await fetch('https://glacial-escarpment-40412.herokuapp.com/songs')
      .then(data => data.json())
      .then(res => setSongs(res))
  };

  const changeSong = async (ytId, songId) => {
    setYoutubeId(ytId);
    setSongId(songId);
    const filter = songs.filter(s => s.id === songId);
    setChosenSong(filter[0]);
  };

  const search = async (searchVal) => {
    await getSongs()
    if (searchVal) {
      // Array of songs name
      const lCSongList = songs.map(s => s.title);
      // Convert all to LowerCase and get the requested song name 
      const searchResult = lCSongList.filter(s => s.toLowerCase().match(searchVal.toLowerCase()))[0];
      // The result array after filtering
      const resultList = songs.filter(s => s.title === searchResult);
      if (resultList.length) {
        setSongs(resultList);
        setErrMsg('');
      }
      else {
        setErrMsg('No match found. Try again!');
        getSongs();
      }
    }
    else {
      getSongs();
    }

  }

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <div className="content">
        <Sidebar songs={songs} youtubeId={youtubeId} changeSong={changeSong} search={search} errMsg={errMsg} />
        <Main youtubeId={youtubeId} songlist={songs} songId={songId} chosenSong={chosenSong} />
      </div>
    </div>
  );
}

export default App;
