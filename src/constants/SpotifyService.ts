import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RestApiServer from './RestApiServer';
import {slugText} from './Helper';

const config = {
  clientId: '3880adb61bc74d7d9588d80e0d203427',
  clientSecret: '66b79b58b3f74d4b8add92e11f120a55',
  clientUrl: 'https://api.spotify.com/v1',
  clientAccountUrl: 'https://accounts.spotify.com',
};

interface Genres {
  rock: string;
  pop: string;
  country: string;
  rb: string;
  hiphop: string;
  danceelectronic: string;
}

const Catgories: Genres = {
  rock: '6FeCuQED40tO2WiqxdEH4c',
  pop: '5LlpGnSM7pdEWzms5wvfhQ',
  country: '0VveLoV8y6z3A6UcchqYyU',
  rb: '73kq7c4ElFXyv2oPDP1rSX',
  hiphop: '29GzDXX9QGQyyqREIlirnM',
  danceelectronic: '70D1qqxmkF8UXZtmd8KAwv',
};

interface Track {
  id: string; // Assuming id is a string
  name: string;
  artists: [];
  album: {
    images: [];
  };
  preview_url: string | null; // Preview URL can be a string or null
}

// Define the structure of each item containing a track
interface Item {
  track: Track; // Each item has a track
}

const getRandomCharacter = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

// Function to get the access token from Spotify
const getAccessToken = async () => {
  // AsyncStorage.removeItem('token');
  // AsyncStorage.removeItem('expirationDate');
  const accessToken = await AsyncStorage.getItem('token');
  const expirationDate = await AsyncStorage.getItem('expirationDate');
  if (expirationDate !== null && Date.now() < parseInt(expirationDate, 10)) {
    return accessToken;
  }
  try {
    const response = await axios.post(
      `${config.clientAccountUrl}/api/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      {
        headers: {
          Authorization:
            'Basic ' + btoa(config.clientId + ':' + config.clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const data = response.data ?? {};
    if (data) {
      const tokenExpirationTime = Date.now() + data.expires_in * 1000;
      await AsyncStorage.setItem('token', data.access_token);
      await AsyncStorage.setItem(
        'expirationDate',
        tokenExpirationTime.toString(),
      );
      return data.access_token;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
  }
};

// Function to fetch categories from Spotify API
const fetchGenres = async (token: string) => {
  const response = await axios.get(
    `${config.clientUrl}/browse/categories?limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = response.data ?? {};
  return data ? data.categories.items : data;
};

const fetchRandomArtists = async (token: string) => {
  const randomCharacter = getRandomCharacter();
  const artists = await searchArtists(token, randomCharacter);
  return artists;
};

// Function to fetch Artists from Spotify API
const searchArtists = async (token: string, query: string) => {
  try {
    const response = await axios.get(`${config.clientUrl}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: `artist:${query}`,
        type: 'artist',
        limit: 20,
      },
    });
    const data = response.data ?? {};
    return data ? data.artists.items : data;
  } catch (error) {
    console.error(error);
  }
};

// Function to get a random number
const getRandomNumber = (range: number) => {
  return Math.floor(Math.random() * range);
};

// Function to fetch Artists from Spotify API
const searchRandomTrackByArtist = async (
  token: string,
  artist: string,
  userId: number,
  userToken: string,
) => {
  try {
    // Search for tracks based on the id
    const responseFilter = await axios.get(
      `${config.clientUrl}/artists/${artist}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const dataFIlter = responseFilter.data ?? {};
    const artists = dataFIlter ? dataFIlter.artists : dataFIlter;
    if (artists) {
      return searchRandomTrack(token, artists, userId, userToken);
    } else {
      return dataFIlter;
    }
  } catch (error) {
    console.error(error);
  }
};

const searchRandomTrack = async (
  token: string,
  artists: any,
  userId: number,
  userToken: string,
) => {
  const randomArtistsIndex = getRandomNumber(artists.length);
  const randomArtist = artists[randomArtistsIndex];

  const response = await axios.get(`${config.clientUrl}/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: `artists:${randomArtist.name}`,
      type: 'track',
      limit: 20,
    },
  });
  const data = response.data ?? {};
  const tracks = data ? data.tracks.items : data;
  if (tracks) {
    const randomIndex = getRandomNumber(tracks.length);
    const randomTrack = tracks[randomIndex];
    const hasPlayed = await RestApiServer.fetchVoteById(
      randomTrack.id,
      userId,
      userToken,
    );
    if (hasPlayed) {
      searchRandomTrack(token, artists, userId, userToken);
    }
    return randomTrack;
  } else {
    return data;
  }
};

// Function to get a random track by category
const searchRandomTrackByCategory = async (
  token: string,
  category: keyof Genres,
) => {
  try {
    const cleanCatagory: string = slugText(category);
    // Search for tracks based on the category
    const response = await axios.get(
      `${config.clientUrl}/playlists/${
        Catgories[cleanCatagory as keyof Genres]
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      },
    );
    const data = response.data ?? {};
    const tracks = data.tracks ? data.tracks.items : data;
    if (tracks) {
      const revisedTracks = data.tracks.items.map(
        ({
          track: {
            id,
            name,
            artists,
            preview_url,
            album: {images},
          },
        }: Item) => ({
          id,
          name,
          artists,
          preview_url,
          album: {
            images,
          },
        }),
      );
      // Filter Out all Blank Preview
      const filteredTracks = revisedTracks.filter(
        (item: {preview_url: string | null}) => item.preview_url !== null,
      );
      const randomIndex = getRandomNumber(filteredTracks.length);
      const randomTrack = filteredTracks[randomIndex];
      return randomTrack;
    } else {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to get a random track by id
const searchTrack = async (token: string, track: string) => {
  try {
    const response = await axios.get(`${config.clientUrl}/tracks/${track}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data ?? {};
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAccessToken,
  fetchGenres,
  fetchRandomArtists,
  searchArtists,
  searchTrack,
  searchRandomTrackByArtist,
  searchRandomTrackByCategory,
};
