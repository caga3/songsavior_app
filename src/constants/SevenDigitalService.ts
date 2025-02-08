// import axios from 'axios';
// import {makeBufferRequest, makeOAuthRequest} from './OauthHelper';
// import RestApiServer from './RestApiServer';
// import {
//   BASE_URL_API,
//   BASE_URL_STREAM_API,
//   BASE_URL_STUDIO_API,
// } from '../../global';
// import {padNumber} from './Helper';

type Genres = {
  id: string;
  name: string;
  title: string;
};

const Categories: Genres[] = [
  {id: 'kBtDPennxKjgyx', name: 'pop', title: 'Pop'},
  {id: 'oXtkJEezzk8JD1', name: 'rock', title: 'Rock'},
  {id: 'kBtDPenbAnOEZ5', name: 'country', title: 'Country'},
  {id: 'gXtBvebdyozlwp', name: 'rb', title: 'R&B'},
  {id: '18tnZvmQv5vnME', name: 'hiphop', title: 'Hip-Hop'},
  {
    id: 'nZtMNe4ayeKA3p',
    name: 'danceelectronic',
    title: 'Dance/Electronic',
  },
];

// interface Track {
//   id: string; // Assuming id is a string
//   name: string;
//   artists: [];
//   album: {
//     images: [];
//   };
//   preview_url: string | null; // Preview URL can be a string or null
// }

// Define the structure of each item containing a track
// interface Item {
//   track: Track; // Each item has a track
// }

const fetchGenres = async () => {
  return Categories;
  // const url = `${BASE_URL_STUDIO_API}playlists?country=US`;
  // try {
  //   const response = await makeOAuthRequest<{}>({
  //     url,
  //     method: 'GET',
  //   });
  //   console.log('Track Details:', response.data);
  //   if (Array.isArray(response.data)) {
  //     return response.data;
  //   } else {
  //     return undefined;
  //   }
  // } catch (error) {
  //   console.error('Failed to fetch track details:', error);
  // }
};

// Function to fetch Artists from Spotify API
// const searchArtists = async (query: string) => {
//   if (!query) {
//     query = getRandomCharacter();
//   }
//   const url = `${BASE_URL_API}artist/browse?letter=${query}&country=US`;
//   try {
//     const response = await makeOAuthRequest(url, false);
//     if ((response.data as any).artists.artist) {
//       return (response.data as any).artists.artist;
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     console.error('Failed to fetch track details:', error);
//   }
// };

// const getRandomCharacter = () => {
//   const characters = 'abcdefghijklmnopqrstuvwxyz';
//   return characters.charAt(Math.floor(Math.random() * characters.length));
// };

// // Function to get a random number
// const getRandomNumber = (range: number) => {
//   return Math.floor(Math.random() * range);
// };

// const searchRandomTrack = async (
//   token: string,
//   artists: any,
//   userId: number,
//   userToken: string,
// ) => {
//   const randomArtistsIndex = getRandomNumber(artists.length);
//   const randomArtist = artists[randomArtistsIndex];

//   const response = await axios.get(`${BASE_URL_API}/search`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: {
//       q: `artists:${randomArtist.name}`,
//       type: 'track',
//       limit: 20,
//     },
//   });
//   const data = response.data ?? {};
//   const tracks = data ? data.tracks.items : data;
//   if (tracks) {
//     const randomIndex = getRandomNumber(tracks.length);
//     const randomTrack = tracks[randomIndex];
//     const hasPlayed = await RestApiServer.fetchVoteById(
//       randomTrack.id,
//       userId,
//       userToken,
//     );
//     if (hasPlayed) {
//       searchRandomTrack(token, artists, userId, userToken);
//     }
//     return randomTrack;
//   } else {
//     return data;
//   }
// };

// // Function to get a random track by category
// const searchRandomTrackByCategory = async (categoryId: string) => {
//   const url = `${BASE_URL_STUDIO_API}playlists/${categoryId}?country=US`;
//   try {
//     // Make the OAuth request
//     const response = await makeOAuthRequest(url, true);

//     // Ensure the response has the expected structure
//     if (
//       response.data &&
//       response.data.playlist &&
//       response.data.playlist.tracks
//     ) {
//       const tracks = response.data.playlist.tracks;
//       const randomIndex = getRandomNumber(tracks.length);
//       const randomTrack = tracks[randomIndex];
//       if (randomTrack.trackId) {
//         randomTrack.image = `https://artwork-cdn.7static.com/static/img/sleeveart/00/000/000/${padNumber(
//           randomTrack.releaseId,
//         )}_500.jpg`;
//         try {
//           const urlStream = `${BASE_URL_STREAM_API}stream/catalogue?trackId=${randomTrack.trackId}&formatId=11&country=US`;
//           const responseStream = await makeBufferRequest(urlStream, true);
//           if (responseStream) {
//             console.log(responseStream);
//             randomTrack.source = responseStream;
//           }
//         } catch (error) {
//           // Handle any errors in the request or processing
//           console.error('Error fetching or processing tracks:', error);
//         }
//       }
//       console.log(randomTrack);
//       return randomTrack;
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     console.error('Failed to fetch tracks:', error);
//   }
// };

// // Function to get a random track by id
// const searchTrack = async (track: string) => {
//   // try {
//   //   const response = await axios.get(`${BASE_URL_API}/tracks/${track}`, {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   });
//   //   const data = response.data ?? {};
//   //   return data;
//   // } catch (error) {
//   //   console.error(error);
//   // }
// };

export default {
  fetchGenres,
  // searchArtists,
  // searchTrack,
  // searchRandomTrackByCategory,
};
