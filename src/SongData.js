import { Box, Text, Button } from "grommet";
import React from "react";
import { useState, useEffect } from "react";

const SongData = (props) => {
  const topArtists = props.topArtists.topArtists;
  const userData = props.userData.userData;

  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    `Looks like you're slightly obsessed with ${topArtists[0].name}, ${topArtists[1].name}, and ${topArtists[2].name}. We've got similar taste. I think you'd like my music too!`
  );
  const [index, setIndex] = useState(0);
  const [textDone, setTextDone] = useState(false);
  const [moreText, setMoreText] = useState("");
  const [fullMoreText, setFullMoreText] = useState(`Pssst... your top artist right now is ${userData[0].name}. That's - kinda - embarassing. Good thing you still have time to listen to shelbypoly on spotify before this year's wrapped comes out! Just play my song on repeat for the rest of the year. Problem solved.`);
  const [moreIndex, setMoreIndex] = useState(0);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 30);
    }
  }, [index]);

  useEffect(() => {
    if (moreIndex < fullMoreText.length && seeMore) {
        setTimeout(() => {
            setMoreText(moreText + fullMoreText[moreIndex]);
            setMoreIndex(moreIndex + 1);
        }, 30);
    }
  }, [moreIndex, seeMore]);

  /* TODO: 
    - make 'SHELBYPOLY ON SPOTIFY' fade in
    - make 'see more' styled & fade in
    - make div the correct size (a bit smaller than the xlarge or whatever it is now)
  */


  return (
    <Box pad={{ top: "medium", left: "small", bottom: "medium" }}>
        <Text>{text}</Text>
        {index >= fullText.length ? 
            seeMore ? 
                <Box pad={{ top: "small", left: "none", bottom: "small" }}>
                    <Text>{moreText}</Text>
                </Box>
            :
                <Button
                color="black"
                margin="medium"
                label="see more"
                onClick={() => setSeeMore(true)}
                ></Button> 
        : 
            <></>
        }
        {moreIndex >= fullMoreText.length ?
            <Button
                transition
                hoverIndicator="true"
                color="white"
                justify="center"
                pad="medium"
                alignSelf="center"
                margin="medium"
                label="SHELBYPOLY ON SPOTIFY"
                href="https://open.spotify.com/artist/1ya8j4J9q0Br2duXKa8GZQ?si=XGoyiRThT1yta2ylzbOYZg"
            ></Button>
        :   
            <></>
        }
    </Box>
  );
};

export default SongData;
