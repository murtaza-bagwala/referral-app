const API_HOST = process.env.API_HOST;

export async function logoutUser(token) {
  return fetch(`${API_HOST}/logout`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data.json();
  });
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_HOST}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: credentials }),
  });

  let token = response.headers.get("authorization");
  token = token && token.split(" ")[1];
  const data = await response.json();
  return { token, data };
}

export async function registerUser(credentials) {
  const response = await fetch(`${API_HOST}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: credentials }),
  });

  let token = response.headers.get("authorization");
  token = token && token.split(" ")[1];
  const data = await response.json();
  return { token, data };
}

export async function fetchReferralList(token) {
  const response = await fetch(`${API_HOST}/invitations/invited_by_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function inviteUser(email, token) {
  const response = await fetch(`${API_HOST}/invitation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user: { email } }),
  });
  const data = await response.json();
  return data;
}

export async function acceptInvite(credentials) {
  const response = await fetch(`${API_HOST}/invitation`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: credentials }),
  });
  const data = await response.json();
  return data;
}
