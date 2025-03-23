import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../global';
import {Platform} from 'react-native';

const endpoints = {
  //auth: '/jwt-auth/v1/token',
  auth: '/wp-login/v1/login',
  register: '/wp-register/v1/register',
  converations: '/messaging/v1/conversations',
  // create_converations: '/messaging/v1/conversations/create',
  messages: '/messaging/v1/messages',
  //messages_conversation: '/messaging/v1/messages-conversations',
  send_message: '/messaging/v1/messages/send',
  vote_id: '/ratings/v1/votes/id',
  votes: '/ratings/v1/votes',
  send_vote: '/ratings/v1/votes/send',
  songs: '/ratings/v1/songs',
  songs_id: '/ratings/v1/songs/id',
  songs_random: '/playlist/v1/song',
  songs_track: '/playlist/v1/track',
  stats: '/ratings/v1/stats',
  likes: '/ratings/v1/likes',
  playlist: '/ratings/v1/playlist',
  follow: '/profile/v1/follow',
  leaderboard: '/ratings/v1/leaderboard',
  profile: '/profile/v1/stats',
  profile_update: '/profile/v1/update',
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method: RequestMethod;
  body?: FormData;
  headers: Headers;
}

const makeApiRequest = async (
  $method: RequestMethod,
  endpointKey: string = '',
  $params = null ? null : new FormData(),
  token: string = '',
) => {
  const $headers = new Headers();
  if (token) {
    $headers.append('Authorization', `Bearer ${token}`);
  }
  const requestOptions: RequestOptions = {
    method: $method,
    body: $params || undefined,
    headers: $headers,
  };
  try {
    const response = await fetch(`${BASE_URL}${endpointKey}`, requestOptions);
    const messageOut = await response.json();
    if (messageOut.code === 'jwt_auth_invalid_token') {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
    }
    return messageOut;
  } catch (error) {
    console.error('Error fetching rest token:', error);
  }
};

// Function to get the access token from Server
const getRestToken = async ($username: string, $password: string) => {
  const dataForm = new FormData();
  dataForm.append('username', $username);
  dataForm.append('password', $password);
  return await makeApiRequest('POST', endpoints.auth, dataForm);
};

// Function to call the access token from Server
const callRegister = async (
  $username: string,
  $fullname: string,
  $email: string,
  $password: string,
) => {
  const dataForm = new FormData();
  dataForm.append('username', $username);
  dataForm.append('fullname', $fullname);
  dataForm.append('email', $email);
  dataForm.append('password', $password);
  return await makeApiRequest('POST', endpoints.register, dataForm);
};

// Update Profile
const updateProfile = async (
  $userId: number,
  $display_name: string,
  $password: string,
  $image: any,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('uid', $userId.toString());
  dataForm.append('display_name', $display_name);
  dataForm.append('password', $password);

  dataForm.append('file', {
    uri: Platform.OS === 'ios' ? $image.uri.replace('file://', '') : $image.uri,
    name: $image.fileName,
    type: $image.type || 'image/jpeg',
  });
  console.log(dataForm);

  try {
    const response = await fetch(
      `https://www.songsavior.com/wp-json/profile/v1/update`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: dataForm,
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log('Image uploaded successfully:', data);
    } else {
      const error = await response.text(); // Log server-side error
      console.error('Server Error:', error);
    }
  } catch (err) {
    console.error('Network Error:', err); // Improved error logging
  }

  // console.log($image);
  // if ($image && $image.uri) {
  //   const fileExtension = $image.fileName?.split('.').pop() || 'jpg';
  //   const filename = fileExtension
  //     ? `user_profile_${$userId}.${fileExtension[1]}`
  //     : `user_profile_${$userId}.jpg`;
  //   dataForm.append('file', {
  //     uri: $image.uri.startsWith('file://')
  //       ? $image.uri
  //       : `file://${$image.uri}`,
  //     type: $image.type || 'image/jpeg',
  //     name: filename,
  //   });
  // }
  // console.log(dataForm);

  // try {
  //   const response = await fetch(endpoints.profile_update, {
  //     method: 'POST',
  //     body: dataForm,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const responseData = await response.json();
  //   console.log('Server Response:', responseData);

  //   return response.ok;
  // } catch (error) {
  //   console.error('Network error:', error);
  //   return false;
  // }
};

// Function to get a conversations
const fetchConversations = async (userId: number, token: string) => {
  const endPoint = endpoints.converations + '?user_id=' + userId;
  return await makeApiRequest('GET', endPoint, null, token);
};

// Function to filter a conversations
const filterConversations = async (
  userId: number,
  filter: string,
  token: string,
) => {
  const endPoint =
    endpoints.converations + '?user_id=' + userId + '&filter=' + filter;
  return await makeApiRequest('GET', endPoint, null, token);
};

// Function to create Conversa
// const createConversation = async (
//   sender_id: number,
//   recipient_id: number,
//   token: string,
// ) => {
//   const dataForm = new FormData();
//   dataForm.append('sender_id', sender_id);
//   dataForm.append('recipient_id', recipient_id);
//   return await makeApiRequest(
//     'POST',
//     endpoints.create_converations,
//     dataForm,
//     token,
//   );
// };

// Function to get a messages
const fetchMessages = async (
  recipient_id: number,
  sender_id: number,
  token: string,
) => {
  return await makeApiRequest(
    'GET',
    endpoints.messages +
      '?recipient_id=' +
      recipient_id +
      '&sender_id=' +
      sender_id,
    null,
    token,
  );
};

// Function to send messages
const sendMessages = async (
  $recipient_id: number,
  $sender_id: number,
  $message: string,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('recipient_id', $recipient_id);
  dataForm.append('sender_id', $sender_id);
  dataForm.append('message', $message);
  // console.log(dataForm);
  return await makeApiRequest('POST', endpoints.send_message, dataForm, token);
};

// Function to send vote
const sendVote = async (
  $genre: string,
  $song_id: string,
  $user_id: number,
  $vote: number,
  $track: string,
  $title: string,
  $artist: string,
  $image: string,
  $year: number,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('genre', $genre);
  dataForm.append('song_id', $song_id);
  dataForm.append('user_id', $user_id);
  dataForm.append('vote', $vote);
  dataForm.append('track', $track);
  dataForm.append('image', $image);
  dataForm.append('title', $title);
  dataForm.append('artist', $artist);
  dataForm.append('year', $year);
  return await makeApiRequest('POST', endpoints.send_vote, dataForm, token);
};

const toggleLikes = async (
  $song_id: string,
  $user_id: number,
  $like: number,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('song_id', $song_id);
  dataForm.append('user_id', $user_id);
  dataForm.append('likes', $like);
  return await makeApiRequest('POST', endpoints.likes, dataForm, token);
};

const togglePlaylist = async (
  $song_id: string,
  $user_id: number,
  $list: number,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('song_id', $song_id);
  dataForm.append('user_id', $user_id);
  dataForm.append('list', $list);
  return await makeApiRequest('POST', endpoints.playlist, dataForm, token);
};

const toggleFollow = async (
  $user_id: number,
  $follow: number,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('user_id', $user_id);
  dataForm.append('follow', $follow);
  return await makeApiRequest('POST', endpoints.follow, dataForm, token);
};

const fetchLikes = async (user_id: number, token: string, song_id?: number) => {
  return await makeApiRequest(
    'GET',
    endpoints.likes +
      '?user_id=' +
      user_id +
      (song_id ? '&song_id=' + song_id : ''),
    null,
    token,
  );
};

const fetchPlaylist = async (
  user_id: number,
  token: string,
  song_id?: number,
) => {
  return await makeApiRequest(
    'GET',
    endpoints.playlist +
      '?user_id=' +
      user_id +
      (song_id ? '&song_id=' + song_id : ''),
    null,
    token,
  );
};

// Function to get a vote
const fetchVotes = async (user_id: number, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.votes + '?user_id=' + user_id,
    null,
    token,
  );
};
// Function to get a vote
const fetchVoteById = async (
  songId: number,
  user_id: number,
  token: string,
) => {
  return await makeApiRequest(
    'GET',
    endpoints.vote_id + '?song_id=' + songId + '&user_id=' + user_id,
    null,
    token,
  );
};

// Function to get a stats
const fetchStats = async (user_id: number, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.stats + '?user_id=' + user_id,
    null,
    token,
  );
};

// Function to get a vote
const fetchSongs = async (token: string) => {
  return await makeApiRequest('GET', endpoints.songs, null, token);
};

// Function to get leaderboard
const fetchLeaderBoard = async (token: string) => {
  return await makeApiRequest('GET', endpoints.leaderboard, null, token);
};

// Function to get Profile Stats
const fetchProfileStats = async (
  user_id: number,
  profile_id: number,
  token: string,
) => {
  return await makeApiRequest(
    'GET',
    `${endpoints.profile}?user_id=${user_id}${
      user_id !== profile_id ? `&profile_id=${profile_id}` : ''
    }`,
    null,
    token,
  );
};

// Function to random song
const searchRandomTrackByCategory = async (genre: string, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.songs_random + '?category=' + genre,
    null,
    token,
  );
};
// Fetch Track by item ID
const searchTrack = async (item: string, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.songs_track + '?track=' + item,
    null,
    token,
  );
};

export default {
  getRestToken,
  callRegister,
  fetchConversations,
  filterConversations,
  fetchMessages,
  sendMessages,
  sendVote,
  fetchVotes,
  fetchVoteById,
  fetchSongs,
  fetchStats,
  fetchPlaylist,
  toggleLikes,
  togglePlaylist,
  toggleFollow,
  fetchLikes,
  fetchLeaderBoard,
  fetchProfileStats,
  updateProfile,
  searchRandomTrackByCategory,
  searchTrack,
};
