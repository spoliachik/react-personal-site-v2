import React, { useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SongDataModule from './SongDataModule';
import './SongSearchForm.css';
import ColorTile from './ColorTile';
import getToken from './spotify';
require("dotenv").config();

let credentials = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/'
}
console.log(credentials);

const SongSearchForm = () => {

    //can i do authentication from here? do I need authentication?? 
    let spotifyApi = new SpotifyWebApi(credentials);
    let authCode;
    getToken()
        .then((result) => {
            console.log(result.data);
            authCode = result.data.access_token;
            spotifyApi.setAccessToken(authCode);
        });

    let [songName, setSongName] = useState("");
    let [tracks, setTracks] = useState([]);
    let [songDataModules, setSongDataModules] = useState([]);
    let [searchStarted, setSearchStarted] = useState(false);
    let [songClicked, setSongClicked] = useState(false);
    let [songColorData, setSongColorData] = useState({});

    const onSearchChange = (async () =>  {
        setSearchStarted(true);
        if (songName.length == 0) {
            return;
        } else {
            try {
                let results = await spotifyApi.searchTracks(songName, {limit: 10});

                setTracks(results.body.tracks.items);
                let tempSongDataArray = [];
                for (let i = 0; i < tracks.length; i++) {
                    tempSongDataArray.push(
                        <SongDataModule 
                            key={i} 
                            data={tracks[i]}
                            api={spotifyApi}
                            //need to pass authCode probably
                            setSongClicked={setSongClicked}
                            setSongColorData={setSongColorData}
                            className="songModule"
                        />
                    );
                } 
                setSongDataModules(tempSongDataArray);
            } catch (err){
                console.log(err);
            }
        }

    });

    return (
        <div className="mainDiv">
            <div className="leftSide">
            <label className="searchLabel">
                Search For a Song: 
            </label>
            <div className="searching">
                <form className="searchLabel">
                    <input type="text" 
                        className="searchInput"
                        placeholder="Song Title"
                        name="songName"
                        value={songName}
                        onChange={e => {setSongName(e.target.value); onSearchChange();}} 
                    />
                </form>
            </div>
                <div className="songDataModules">
                    {searchStarted && songDataModules}
                </div>
            </div>
            <div className="rightSide">
                {songClicked && <ColorTile songData={songColorData}/>}
            </div>
        </div>
    );
}

export default SongSearchForm;