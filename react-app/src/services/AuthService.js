const API_HOST = 'http://localhost:3001/api';

export async function logoutUser(token) {
  
  return fetch(`${API_HOST}/users/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then((data) => {
    return data.json();
  });
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_HOST}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: credentials }),
  });

  let token = response.headers.get("authorization");
  token = token && token.split(" ")[1];
  const data =  await response.json();
  return { token, data };
  
}

export async function registerUser(credentials) {
  const response = await fetch(`${API_HOST}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: credentials }),
  });

  let token = response.headers.get("authorization");
  token = token && token.split(" ")[1];
  const data =  await response.json();
  return { token, data };
}

export async function fetchReferralList(credentials) {
  const response = await fetch(`${API_HOST}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: credentials }),
  });

  let token = response.headers.get("authorization");
  token = token && token.split(" ")[1];
  const data =  await response.json();
  return { token, data };
}
