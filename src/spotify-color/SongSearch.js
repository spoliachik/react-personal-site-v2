import React, { useState } from 'react';
import SongSearchForm from './SongSearchForm';
import "./SongSearch.css"

const SongSearch = (code) => {
    return (
        <div className="MainDiv">
            <p className="title">What's This Song's Vibe? (As a Color)</p>
            <SongSearchForm code={code}/>
        </div>
    );
}

export default SongSearch;