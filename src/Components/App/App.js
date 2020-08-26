import React from 'react';

import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        searchResults: [],
        playlistName: "My Playlist",
        playlistTracks: [],
      }
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.searchSpotify = this.searchSpotify.bind(this);
  }

 
  addTrack(track) {
    console.log(track);
      if(this.state.playlistTracks.find(savedTrack => savedTrack.ID === track.ID)) {
        return;
      } 
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  removeTrack(track) {
     this.setState({
      playlistTracks: this.state.playlistTracks.filter(removeTrack => removeTrack.ID !== track.ID)
    });
  }

  updatePlaylistName(name) {
    return this.setState({
      playlistName: name 
      });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(tracks => tracks.URI);
    console.log(trackURIs);
    Spotify.savePlaylists(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
      })
    //const trackURIs = this.state.playlistTracks[uri]; //This might not be correct
  }
  
  searchSpotify(term){
    Spotify.searchSpotify(term)
      .then(tracks => this.setState({
          searchResults: tracks
        }))
     //will be hooked up to Spotify API
  }

  render() {
    console.log(this.state.searchResults);
    console.log(this.state.playlistTracks);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults}
            onAdd = {this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName}
              playlistTracks = {this.state.playlistTracks}
              onNameChange = {this.updatePlaylistNames}
              onRemove = {this.removeTrack}
              onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
