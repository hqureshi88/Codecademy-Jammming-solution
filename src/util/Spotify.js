const clientID = "cdbdf691bca346dea3ff6eb2a15e0f10";
const redirectURI = "http://HamJam.surge.sh/";
//const redirectURI = "http://localhost:3000/";
let accessToken; // to be updated for accessToken

//visit website https://discuss.codecademy.com/t/feature-request-jammming/505153/2
const Spotify = {
    getAccessToken() {
        if (accessToken) {
                return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //uses match and creates an array for exploiting accesstoken value from URL
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); //uses match and creates an array for exploiting expiresIn value from URL 
        //console.log(accessTokenMatch);
        if(accessTokenMatch && expiresInMatch) { // if these values are true
            accessToken = accessTokenMatch[1]; //access the value from the array
            const expiresIn = expiresInMatch[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000); //set expire time for the array
            window.history.pushState('Access Token', null, '/'); //pushes null on history which wipes out the url
            return accessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;
            //return window.location;
        }
    },
    searchSpotify(term){
        console.log(term);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {   
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}` // not executing the getAccesstoken
            }
        })
        .then(response => {return response.json()})
        .then(jsonResponse => {
            console.log(jsonResponse);
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => ({
                        ID: track.id,
                        Name: track.name,
                        Artist: track.artists[0].name,
                        Album: track.album.name,
                        URI: track.uri
                }));
            }
        });
    },
    savePlaylists(playlistName, trackURIs) { 
        if(!playlistName || !trackURIs.length){ //may not be correct
            return;
        }
        const accessDefault = Spotify.getAccessToken();
        const headers = { 
            Authorization: `Bearer ${accessDefault}`
        };
        console.log(trackURIs);
        let userId;
        let playlistId; // is this in the right location?
        
        //return users ID from Spotify API
        return fetch('https://api.spotify.com/v1/me',
        {
            headers: headers
        })
        .then(response => {return response.json()})
        .then(jsonResponse => {
            userId = jsonResponse.id;

            // Adds playlist to users account
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName}) //{property: parameter}
            })
                .then(response => {return response.json()})
                .then(jsonResponse => {
                    playlistId = jsonResponse.id;
                    //Adds tracks to new playlist
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        headers: headers, //expected to pass method and body as parameters???
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs }) // this might be correct?
                    });
        });
        
    });
    }
}

export default Spotify;