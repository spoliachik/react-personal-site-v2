import { Box, Heading, Text, Button } from "grommet";
import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import React from "react";
import { Buffer } from "buffer";
import SongData from "./SongData";
import { Instagram, MailOption, Music } from "grommet-icons";
// import InstagramProfile from "./InstagramProfile";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize/";
const RESPONSE_TYPE = "code";
const AUTH_SCOPE = "user-top-read";
const auth_token = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
  "utf-8"
).toString("base64");

const getTopArtists = (spotifyData) => {
  const myGenres = [
    "indie pop",
    "indieacoustica",
    "indie folk",
    "folk-pop",
    "pop rock",
  ];
  const filteredArtists = spotifyData.filter((artist) => {
    return artist.genres.some((i) => myGenres.includes(i));
  });
  return filteredArtists;
};

const getClientCredentials = async () => {
  try {
    const data = { grant_type: "client_credentials" };
    const options = {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth_token,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
      url: "https://accounts.spotify.com/api/token",
    };
    const response = await axios(options);
    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.log('Error trying to get the client credentials', error);
  }
};

const MusicSection = () => {
  const [clientToken, setClientToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [userToken, setUserToken] = useState("");
  const [refreshToken, setRefreshToken] = useState(""); 
  const [topArtists, setTopArtists] = useState([]);
  const [userData, setUserData] = useState([]);
  const [allSoYouMight, setAllSoYouMight] = useState({});
  const [songLoaded, setSongLoaded] = useState(false);

  useEffect(() => {
    const uriString = window.location.search;
    const uriParams = new URLSearchParams(uriString);
    setUserToken(localStorage.getItem("userToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    if (uriParams.get("code")) {
      setAuthCode(uriParams.get("code"));
    }

    const fetchToken = async () => {
      const newToken = await getClientCredentials();
      setClientToken(newToken);
    };

    if (!clientToken) {
      fetchToken();
    } else {
      axios
        .get("https://api.spotify.com/v1/tracks/3aEprPAKDipGjVrrJ6TWkl", {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        })
        .catch((err) => {
          console.log('Error trying to get the Spotify track', err);
        })
        .then((response) => {
          setAllSoYouMight(response.data);
          setSongLoaded(true);
        });
    }
  }, [clientToken]);

  useEffect(() => {
    if (authCode && !userToken) {
      let options = {
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
          Authorization: `Basic ${auth_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        params: new URLSearchParams({
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri: REDIRECT_URI,
          scope: "user-top-read",
        }),
        data: {},
      };

      axios(options)
        .then((res) => {
          const newUserToken = res.data.access_token;
          const newRefreshToken = res.data.refresh_token;
          localStorage.setItem("userToken", newUserToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          setUserToken(newUserToken);
          setRefreshToken(newRefreshToken);
          // Clear out code from url
          window.location.assign(window.location.origin);
        })
        .catch((err) => console.log("Error trying to get Spotify user access token", err));
    }
  }, [authCode]);

  useEffect(() => {
    if (userToken) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            time_range: "medium_term",
          },
        })
        .then((response) => {
          console.log("users top artsits response", response);
          setUserData(response.data.items);
          setTopArtists(getTopArtists(response.data.items));
        })
        .catch((err) => {
          console.log("error in getting users top artists", err);
          if (err.response.status === 401) {
            // Generate new refreshed token
            let options = {
                url: "https://accounts.spotify.com/api/token",
                method: "POST",
                headers: {
                  Authorization: `Basic ${auth_token}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                  Accept: "application/json",
                },
                params: new URLSearchParams({
                  grant_type: "refresh_token",
                  refresh_token: refreshToken,
                  redirect_uri: REDIRECT_URI,
                }),
                data: {},
              };
        
              axios(options)
                .then((res) => {
                    setUserToken(res.data.access_token);
                    localStorage.setItem("userToken", res.data.access_token);
                }).catch((err) => {
                    console.log('Error trying to get the refreshed token', err);
                })
          }
        });
    }
  }, [userToken]);

  return (
    <Box>
      <Heading level={2} margin="none" weight="100">
        Music
      </Heading>
      <Box>
        {songLoaded ? (
          <Box pad={{ top: "medium" }}>
            <iframe
              src="https://open.spotify.com/embed/track/3aEprPAKDipGjVrrJ6TWkl?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </Box>
        ) : (
          <></>
        )}
        <Box>
          <Box direction="row" pad="xsmall" align="center">
            <a href="https://www.instagram.com/shelbypolymusic/" style={{ color:'black', 'text-decoration': 'none' }}>
              <Instagram size="small"/> 
              <Text margin={{left:"small"}} size="small">shelbypolymusic on Instagram</Text>
            </a>
          </Box>
          <Box direction="row" pad="xsmall" align="center">
            <a href="https://music.apple.com/us/artist/shelbypoly/1607754047" style={{ color:'black', 'text-decoration': 'none' }}>
              <Music size="small"/>
              <Text margin={{left:"small"}} size="small">shelbypoly on Apple Music</Text>
            </a>
          </Box>
          <Box direction="row" pad="xsmall" align="center">
            <a href="mailto:spoliachik@gmail.com" style={{ color:'black', 'text-decoration': 'none' }}>
              <MailOption size="small"/> 
              <Text margin={{left:"small"}} size="small">spoliachik@gmail.com for gigs, questions, or to be friends :)</Text>
            </a>
          </Box>
        </Box>
        <Box>
          {userToken && topArtists[0] && userData ? (
            <SongData topArtists={{ topArtists }} userData={{ userData }} />
          ) : (
            <Box
            margin="medium none medium none"
            border={{ color:'lightGray', size: 'small'}}
            style={{ "border-radius" :'10px'}}
            >
              <Text size="medium" margin="small" min-height="large">
                Sign in to Spotify to see your artist data:
              </Text>
              <Button
                primary
                color="darkGray"
                margin="small"
                onClick={() => {
                  setUserToken("");
                }}
                justify="center"
                alignSelf="start"
                label="Spotify Login"
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-top-read&response_type=${RESPONSE_TYPE}`}
              ></Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

      // TODO: add links to instram/email/apple music
};

export default MusicSection;
