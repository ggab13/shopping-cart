import React, { useState, useEffect } from 'react';

const APIController = (function () {
   // Spotify credentials
   const clientID = '857bbc0aac4d4ed0a09e8c8a73900cf5';
   const clientSCRT = '03880734acdf4d1dbd3916a2d4a7b4b4';
 
   const [token, setToken] = useState('');
   const [searchInput, setSearchInput] = useState('');
   const [albums, setAlbums] = useState([]);
 
   useEffect(() => {
     // API Access Token
     const authParameters = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
       },
       body:
         'grant_type=client_credentials&client_id=' +
         clientID +
         '&client_secret=' +
         clientSCRT,
     };
     fetch('https://accounts.spotify.com/api/token', authParameters)
       .then(result => result.json())
       .then(data => setToken(data.access_token));
   }, []);
 
   console.log(token);
 
   // Search function for the artists
 
   async function search() {
     console.log('Search for ' + searchInput);
     // Get request using search to get ID of the Artist
     const searchParameters = {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token,
       },
     };
 
     const artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',searchParameters)
       .then(response => response.json())
       .then(data => {return data.artists.items[0].id});
       console.log('Artist ID is ' + artistID);
 
       // Get request with Artist ID and get all the albums
     const fetchedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=20', searchParameters)
     .then(response => response.json())
     .then(data => {
       setAlbums(data.items);
   });
   }
})();

export default APIController;
