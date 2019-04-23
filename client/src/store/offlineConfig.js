import fetch from 'cross-fetch'

const BASE_URL = 'http://localhost:8000/api/'

export const NetworkError = (response, status) => {
  this.name = 'NetworkError';
  this.status = status;
  this.response = response;
}

NetworkError.prototype = Error.prototype;

const tryParseJSON = (json) => {
  if (!json) {
    return null;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`Failed to parse unexpected JSON response: ${json}`);
  }
};

const getResponseBody = (res) => {
  const contentType = res.headers.get('content-type') || false;
  if (contentType && contentType.indexOf('json') >= 0) {
    return res.text().then(tryParseJSON);
  }
  return res.text();
};

// Refresh the access token
const refreshAccessToken = () => {
  let refreshToken = localStorage.getItem('refresh_token') || null
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `refresh=${refreshToken}`
  }
  return fetch(BASE_URL + 'token/refresh/', config)
    .then(response =>
      response.json().then(user => ({ user, response }))
    ).then(({ user, response }) => {
      if (!response.ok) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
        return Promise.reject(user)
      } else {
        // If refresh was successful, set the token in local storage
        localStorage.setItem('access_token', user.access)
        return user.access
      }
    }).catch(err => console.error("Error: ", err))
}

export const apiEffect = (effect, _action) => {
  const { url, json, authenticated, ...options } = effect;
  let token = localStorage.getItem('access_token') || null
  let authHeader = (authenticated && token) ? { 'Authorization': `Bearer ${token}` } : {}
  const headers = {
    'content-type': 'application/json',
    ...options.headers,
    ...authHeader,
  };
  if (json !== null && json !== undefined) {
    try {
      options.body = JSON.stringify(json);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  console.group('Pre-fetch')
  console.log(BASE_URL + url)
  console.log({ ...options, headers })
  console.groupEnd()
  return fetch(BASE_URL + url, { ...options, headers }).then(res => {
    if (res.ok) {
      return getResponseBody(res);
    }
    return getResponseBody(res).then(body => {
      throw new NetworkError(body || '', res.status);
    });
  });
}

export const apiDiscard = async (error, _action, _retries) => {
  if (error === null || error.status === null) return false;

  console.group("Error group")
  console.log(error.status)
  console.groupEnd()
  if (error.status === 401) {
    console.log("REFRESH ACCESS TOKEN")
    const newAccessToken = await refreshAccessToken()
    return newAccessToken == null
  }

  return 400 <= error.status && error.status < 500
}

export const apiPersistOptions = {
  blacklist: ['auth'],
}
