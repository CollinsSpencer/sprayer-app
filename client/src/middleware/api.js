import fetch from 'cross-fetch'

const BASE_URL = 'http://localhost:8000/api/'

export function NetworkError(response, status) {
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

const apiEffect = (effect, action) => {
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
  return fetch(BASE_URL + url, { ...options, headers }).then(res => {
    if (res.ok) {
      return getResponseBody(res);
    }
    return getResponseBody(res).then(body => {
      throw new NetworkError(body || '', res.status);
    });
  });
}
export default apiEffect



// function callApi(endpoint, authenticated) {

//   let token = localStorage.getItem('access_token') || null
//   let config = {}

//   if (authenticated) {
//     if (token) {
//       config = {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }
//     }
//     else {
//       throw new Error('No token saved!');
//     }
//   }

//   return fetch(BASE_URL + endpoint, config)
//     .then(response =>
//       response.text().then(text => ({ text, response }))
//     ).then(({ text, response }) => {
//       if (!response.ok) {
//         return Promise.reject(text)
//       }

//       return text
//     }).catch(err => console.log(err))
// }



// export const CALL_API = Symbol('Call API')

// export default store => next => action => {

//   const callAPI = action[CALL_API]

//   // So the middleware doesn't get applied to every single action
//   if (typeof callAPI === 'undefined') {
//     return next(action)
//   }

//   let { endpoint, types, authenticated } = callAPI

//   const [ successType, errorType ] = types

//   return callApi(endpoint, authenticated).then(
//     response =>
//       next({
//         response,
//         authenticated,
//         type: successType
//       }),
//     error => next({
//       error: error.message || 'There was an error.',
//       type: errorType
//     })
//   )
// }
