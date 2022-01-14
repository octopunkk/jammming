let userToken;
let expiresIn;
let CLIENT_ID = 'e15125a6ccc349498818746b5ec793cb';
let REDIRECT_URI = "http://jammming.anais.surge.sh";

let Spotify = {
    getAccessToken() {
        if(userToken){
            return userToken;
        }
        else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)){
            userToken = window.location.href.match(/access_token=([^&]*)/)[1];
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => userToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');        
        }
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
        }
    },
    async search(term) {
        if(!term){
            return [];
        }
        let tracks;
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {headers: {Authorization: `Bearer ${userToken}`}}
        )
        const json = await response.json();
        
        tracks = json.tracks.items.map(track=> {
            return {
                name:track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                id:track.id,
                uri: track.uri,
                }
        });
        return tracks
    },
    async savePlaylist(name, tracks) {
        if(!name || !tracks){
          return;
        }
        let userToken = Spotify.getAccessToken();
        console.log({userToken})
        let headers = { Authorization: `Bearer ${userToken}`};
        const userID = await fetch(`https://api.spotify.com/v1/me`, {headers : headers}).then((response)=>response.json().then((response2)=>response2.id));
        const playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: name}),
        }).then((response)=>response.json().then((response2)=>response2.id));
        console.log({playlistID})
        let trackURIs = tracks.map(track => {
          return track.uri;
        });
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
          {
            method:'POST',
            headers: headers,
            body: JSON.stringify({uris: trackURIs}),
          }
        )
      }
    

};
export default Spotify;