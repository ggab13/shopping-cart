import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import styles from '../assets/styles/Products.scss';
import { FaSearchDollar } from 'react-icons/fa';
import uuid from 'react-uuid';

// Majd az App ból adjam le props-ként az albumokat a Cartnak és a Productsnak ? Talán úgy könyebb
function Products() {
    // Spotify credentials
    const clientID = '857bbc0aac4d4ed0a09e8c8a73900cf5';
    const clientSCRT = '03880734acdf4d1dbd3916a2d4a7b4b4';

    const [token, setToken] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [albums, setAlbums] = useState([]);

    function randomPrice() {
        return genRand(10, 50, 2);
    }

    function genRand(min, max, decimalPlaces) {
        const rand =
            Math.random() < 0.5
                ? (1 - Math.random()) * (max - min) + min
                : Math.random() * (max - min) + min; // could be min or max or anything in between
        const power = Math.pow(10, decimalPlaces);
        return Math.floor(rand * power) / power;
    }
    useEffect(() => {
        //  Access Token to the Spotify API
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
            .then((result) => result.json())
            .then((data) => setToken(data.access_token));
    }, []);

    // Search function for the artists using the token we got above with the API call

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

        const artistID = await fetch(
            'https://api.spotify.com/v1/search?q=' +
                searchInput +
                '&type=artist',
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                return data.artists.items[0].id;
            });
        console.log('Artist ID is ' + artistID);

        // Get request with Artist ID which we got above with the fetch and get all the albums

        const fetchedAlbums = await fetch(
            'https://api.spotify.com/v1/artists/' +
                artistID +
                '/albums' +
                '?include_groups=album&market=US&limit=20',
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                setAlbums(data.items);
            });
    }

    return (
        <div>
            <div className="searchbar">
                <input
                    type="search"
                    placeholder="Search for Artist..."
                    onKeyPress={(event) => {
                        if (event.key == 'Enter') {
                            search();
                        }
                    }}
                    onChange={(event) => setSearchInput(event.target.value)}
                ></input>{' '}
                <FaSearchDollar
                    onClick={() => search()}
                    className="search-icon"
                />
            </div>
            <div className="card-container">
                {albums.map((album, i) => {
                    return (
                        <Card
                            key={uuid()}
                            id={uuid()}
                            src={album.images[0].url}
                            title={album.name}
                            price={randomPrice()}
                        />
                    );
                })}
            </div>
            <div></div>
        </div>
    );
}

export default Products;

/*
  const [token, setToken] = useState('');

  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic' + btoa(client_id + ' : ' + client_secret),
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {
    console.log(tokenResponse.data.access_token);
    setToken(tokenResponse.data.access_token);
  })
  const _getToken = async () => {
    const clientId= '857bbc0aac4d4ed0a09e8c8a73900cf5';
  const clientSecret = '03880734acdf4d1dbd3916a2d4a7b4b4';
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant-type=client_credentials',
    });

    const data = await result.json();
    console.log(data.access_token)
    return data.access_token;
  };
  var request = require('request');
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
    }
  });
*/
