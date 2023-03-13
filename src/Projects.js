import React from "react";
import { Box, Heading, Text, Button } from "grommet";

/*
    TODO:
    - add pics for each of these
    - add links for each of these
    -> store those in an array/maybe a spreadsheet?
*/

// TODO: add React Router & put each project in this repo & display on this website

const Projects = () => {
    return (
        <Box>
            <Heading level={2} margin="none" weight="100" pad="medium">
                Projects
            </Heading>
            <Button 
                href="https://www.youtube.com/watch?v=iz0ksZCFKr4"
                label="One Second Everyday: 2022"
                color="white"
                margin="small"
            ></Button>
            {/* <Button 
                href="https://www.youtube.com/watch?v=iz0ksZCFKr4"
                label="Spotify: Song Color Generator"
                color="white"
                margin="small"
            ></Button> */}
            {/* <Text>
                React Hook Christmas Game
            </Text> */}
        </Box>
    );
}

export default Projects;