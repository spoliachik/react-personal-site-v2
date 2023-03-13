import './ColorTile.css'

function ColorTile(props) {
    const data = props.songData;

    console.log(data);
    //compute color - rbg between 0-255
    // 9 metrics
    // red: danceability, tempo, liveness
    // green: energy, valence, loudness
    // blue: acousticness, instrumentalness, speechiness
    
    const fixedDanceability = data.danceability * 255;
    // const fixedTempo = ((data.tempo - 100) / 50) * 255;
    // const fixedLiveness = data.liveness * 255;
    const fixedEnergy = data.energy * 255;
    const fixedValence = data.valence * 255;
    // const fixedLoudness = (Math.abs((data.loudness - 60) / 60)) * 255;
    // const fixedAcousticness = data.acousticness * 255;
    // const fixedSpeechiness = data.speechiness * 255;

    // let red = (fixedDanceability + fixedTempo) / 2;
    let red = fixedDanceability;
    let green = fixedEnergy;
    let blue = fixedValence;

    console.log(red);
    console.log(green);
    console.log(blue);

    const style = {
        'background-color': `rgb(${red}, ${green}, ${blue})`
    };

    return(
        <div className="colorTileSection">
            <div className="colorTile" style={style}>
            </div>
            <div className="songInfo">
                <h1>{data.songName}</h1>
                <h3>{data.artistName}</h3>
            </div>
            <div className="songMetrics">
                <p>Danceability: {data.danceability}</p>
                <p>Tempo: {data.tempo}</p>
                <p>Energy: {data.energy}</p>
                <p>Valence: {data.valence}</p>
            </div>
            <div>
                <p>
                    Click another song to find its color!
                </p>
            </div>
        </div>
    );
}

export default ColorTile;