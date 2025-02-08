import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

// Factory function to create an OAuth instance with dynamic credentials
function createOAuth(studio: boolean): OAuth {
  const authKeys = studio
    ? {key: '7ducbnu6chwn', secret: 'nnam465prsjyxhba'}
    : {key: '7dq6amuwvnqe', secret: '7my2k667z3rtc8yx'};

  const oauth = new OAuth({
    consumer: {
      key: authKeys.key,
      secret: authKeys.secret,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(baseString: string, key: string): string {
      return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
    },
  });
  return oauth;
}

// Generate OAuth headers
function generateOAuthHeaders(url: string, studio: boolean) {
  const oauth = createOAuth(studio);
  const requestData = {
    url,
    method: 'GET',
    data: {}, // Can be empty if no body data is required for GET requests
  };
  // Get the OAuth authorization parameters
  const authHeaders: any = oauth.authorize(requestData);
  // Log OAuth parameters for debugging
  //console.log('OAuth Parameters:', authHeaders);

  // Create URL with query parameters (e.g., oauth_consumer_key, oauth_signature)
  const oauthParams = new URLSearchParams({
    oauth_consumer_key: authHeaders.oauth_consumer_key,
    oauth_signature_method: authHeaders.oauth_signature_method,
    oauth_timestamp: authHeaders.oauth_timestamp,
    oauth_nonce: authHeaders.oauth_nonce,
    oauth_version: authHeaders.oauth_version,
    oauth_signature: authHeaders.oauth_signature,
  }).toString();
  return url + '&' + oauthParams;
}

// Function to make a signed request
export async function makeOAuthRequest(
  url: string,
  studio: boolean,
): Promise<AxiosResponse> {
  const urlEndpoints = generateOAuthHeaders(url, studio);
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.get(urlEndpoints, axiosConfig);
    return response;
  } catch (error: any) {
    console.error(
      'Error OAuth Request:',
      error.response?.data || error.message,
    );
    throw error;
  }
}

// Function to make a signed request
export async function makeBufferRequest(url: string, studio: boolean) {
  return generateOAuthHeaders(url, studio);
}
