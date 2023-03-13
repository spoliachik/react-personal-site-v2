import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Heading,
  Paragraph,
  Grommet,
  Header,
  grommet,
  ResponsiveContext,
  Text,
  Page,
  PageContent,
  PageHeader,
  Button,
  Image,
} from "grommet";
import React, { useState, useContext } from "react";
import { Moon, Sun } from "grommet-icons";
import { deepMerge } from "grommet/utils";
import Portrait from "./resources/KSC-21.jpg";
import MusicSection from "./MusicSection";
import Projects from "./Projects";
import { Router, Route } from 'react-router-dom';

const theme = deepMerge(grommet, {
  global: {
    colors: {
      black: "#000000",
      gray: "#989898",
      darkGray: "#777777",
      lightGray: '#ECECEC'
    },
    font: {
      family: "Spartan",
      size: "18px",
      height: "20px",
    },
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: { value:1500 },
      middle: {
        value: 3000,
      },
    },
    button: {
      transition: {
        duration: 0.2,
        timing: "ease-in-out",
        properties: "color"
      },
      primary: {
        color: "black"
      }
    }
  },
});

const ResponsiveGrid = ({ children, areas, ...props }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Grid areas={areas[size]} {...props}>
      {children}
    </Grid>
  );
};

const AppBar = (props) => (
  <Box
    align="center"
    as="header"
    pad={{ left: "medium", right: "small", vertical: "medium" }}
    {...props}
  />
);

const App = () => {
  return (
    <Grommet theme={theme} full>
        <Page>
          <AppBar>
            <Text size="4xl" alignSelf="center">
              SHELBYPOLY
            </Text>
          </AppBar>
          <PageContent>
            <Box align="center" pad={{ bottom: "medium" }}>
              <Box height="large" width="xlarge">
                <Image fit="cover" src={Portrait} />
              </Box>
            </Box>
            <ResponsiveContext.Consumer>
              {size => (
                <ResponsiveGrid
                  justifyContent="center"
                  responsive={true}
                  rows={size === "small" || size === "xsmall" ? ["flex", "flex"] : ["flex"]}
                  columns={size === "small" || size === "xsmall" ? ["flex"] : ["flex", "flex"]}
                  areas={{
                    small: [
                      { name: "music", start: [0, 0], end: [0, 0] },
                      { name: "projects", start: [0, 1], end: [0, 1] },
                    ],
                    xsmall: [
                      { name: "music", start: [0, 0], end: [0, 0] },
                      { name: "projects", start: [0, 1], end: [0, 1] },
                    ],
                    middle: [
                      { name: "music", start: [0, 0], end: [0, 0] },
                      { name: "projects", start: [1, 0], end: [1, 0] },
                    ],
                    medium: [
                      { name: "music", start: [0, 0], end: [0, 0] },
                      { name: "projects", start: [1, 0], end: [1, 0] },
                    ]
                  }}
                  gap="xlarge"
                  pad={{ left: "xlarge", right: "xlarge", bottom: "medium", top: "medium" }}
                >
                  <Box gridArea="music">
                    <MusicSection></MusicSection>
                  </Box>
                  <Box gridArea="projects">
                    <Projects></Projects>
                  </Box>
                </ResponsiveGrid>
              )}
            </ResponsiveContext.Consumer>
          </PageContent>
        </Page>
    </Grommet>
  );
};

export default App;
