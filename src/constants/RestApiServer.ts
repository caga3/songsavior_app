import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../global';

const endpoints = {
  auth: '/jwt-auth/v1/token',
  register: '/wp-register/v1/register',
  converations: '/messaging/v1/conversations',
  filter_converations: '/messaging/v1/conversations/filter',
  create_converations: '/messaging/v1/conversations/create',
  messages: '/messaging/v1/messages',
  send_message: '/messaging/v1/messages/send',
  vote_id: '/ratings/v1/votes/id',
  votes: '/ratings/v1/votes',
  send_vote: '/ratings/v1/votes/send',
  songs: '/ratings/v1/songs',
  songs_id: '/ratings/v1/songs/id',
  stats: '/ratings/v1/stats',
  likes: '/ratings/v1/likes',
  leaderboard: '/ratings/v1/leaderboard',
  profile: '/profile/v1/stats',
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
    endpoints.filter_converations + '?user_id=' + userId + '&filter=' + filter;
  return await makeApiRequest('GET', endPoint, null, token);
};

// Function to create Conversa
const createConversation = async (
  sender_id: number,
  recipient_id: number,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('sender_id', sender_id);
  dataForm.append('recipient_id', recipient_id);
  return await makeApiRequest(
    'POST',
    endpoints.create_converations,
    dataForm,
    token,
  );
};

// Function to get a messages
const fetchMessages = async (convId: number, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.messages + '?conv_id=' + convId,
    null,
    token,
  );
};

// Function to send messages
const sendMessages = async (
  $conversation_id: number,
  $sender_id: number,
  $text: string,
  token: string,
) => {
  const dataForm = new FormData();
  dataForm.append('conv_id', $conversation_id);
  dataForm.append('sender_id', $sender_id);
  dataForm.append('text', $text);
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

const fetchLikes = async (song_id: string, user_id: number, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.likes + '?song_id=' + song_id + '&user_id=' + user_id,
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
  songId: string,
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
const fetchProfileStats = async (user_id: number, token: string) => {
  return await makeApiRequest(
    'GET',
    endpoints.profile + '?user_id=' + user_id,
    null,
    token,
  );
};

export default {
  getRestToken,
  callRegister,
  fetchConversations,
  filterConversations,
  createConversation,
  fetchMessages,
  sendMessages,
  sendVote,
  fetchVotes,
  fetchVoteById,
  fetchSongs,
  fetchStats,
  toggleLikes,
  fetchLikes,
  fetchLeaderBoard,
  fetchProfileStats,
};
