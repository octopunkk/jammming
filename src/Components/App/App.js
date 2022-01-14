// import logo from './logo.svg';
import './App.css';
import { render } from 'react-dom';
import React, { useState } from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify';
import {AnimatedBackground} from '../Background/background';


function App() {
  const [searchResults, setSearchResults]=useState(
    []
  );
  const [playlistName, setPlaylistName]=useState('New Playlist');
  const [playlistTracks, setPlaylistTracks]=useState(
    []
  );
  let addTrack = (track) => {
    let isAlreadyIn = false;
    playlistTracks.forEach(playlistTrack => {
      if(playlistTrack.id === track.id){
        isAlreadyIn = true;
      }
    });
    if(!isAlreadyIn){
      setPlaylistTracks((prev)=>[...prev, track]);
    }
  };
  let removeTrack = track => {
    let newPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylistTracks(()=>newPlaylistTracks);
  } 
  let updatePlaylistName = name => setPlaylistName(()=>name);

  let search = searchTerm => {
    Spotify.search(searchTerm).then((response)=>setSearchResults(()=>response));
  }
  let savePlaylist = () => {
    let name = playlistName;
    let tracks = playlistTracks;
    Spotify.savePlaylist(name, tracks);
    setPlaylistName(()=> 'New Playlist');
    setPlaylistTracks(()=> []);
  }
  Spotify.getAccessToken();

  return (
    <div>
      <AnimatedBackground>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={search}/>
          <div className="App-playlist">
            <SearchResults tracks={searchResults} onAdd={addTrack}/>
            <Playlist 
              name={playlistName} 
              tracks={playlistTracks} 
              onRemove={removeTrack} 
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </AnimatedBackground>
    </div>
    
  );
}

export default App;
