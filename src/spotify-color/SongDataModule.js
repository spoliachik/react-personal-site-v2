import React, { useState } from 'react';
import './SongDataModule.css';

const SongDataModule = (props) => {

    const title = props.data.name;
    const imgURL = props.data.album.images[0].url;
    const artist = props.data.artists[0].name;
    const album = props.data.album.name;
    const songUri = props.data.uri.slice(14);

    let audioFeaturesData = {};

    const showSongColor = async () => {
        console.log("show song color clicked!");
        console.log("getting song data...")
        console.log(songUri);

        props.setSongClicked(true);

        try {
            let results = await props.api.getAudioFeaturesForTrack(songUri);
            console.log(results);
            audioFeaturesData = {
                songName: title,
                artistName: artist,
                danceability: results.body.danceability,
                tempo: results.body.tempo,
                instrumentalness: results.body.instrumentalness,
                energy: results.body.energy,
                acousticness: results.body.acousticness,
                liveness: results.body.liveness,
                loudness: results.body.loudness,
                speechiness: results.body.speechiness,
                valence: results.body.valence,
            }
            props.setSongColorData(audioFeaturesData);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div 
            className="songTile"
            onClick={showSongColor}
        >
                <div className="songImageDiv">
                    <img className="songImage" src={imgURL}/>
                    <h3>{album}</h3>
                </div>
                <div className="songInfo">
                    <h1>{title}</h1>
                    <h3>{artist}</h3>
                </div>
        </div>
    );
}

export default SongDataModule;