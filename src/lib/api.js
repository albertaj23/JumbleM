async function readJson(response) {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed.');
  }

  return payload;
}

async function checkNickname(nickname) {
  const response = await fetch(`/api/users/check-nickname?nickname=${encodeURIComponent(nickname)}`);
  return readJson(response);
}

async function registerUser(data) {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return readJson(response);
}

async function registerGoogleUser(data) {
  const response = await fetch('/api/users/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return readJson(response);
}

async function fetchUser(nickname) {
  const response = await fetch(`/api/users/${encodeURIComponent(nickname)}`);
  return readJson(response);
}

async function markNotificationsRead(nickname) {
  const response = await fetch(`/api/users/${encodeURIComponent(nickname)}/notifications/read`, {
    method: 'POST'
  });

  return readJson(response);
}

async function createPost(data) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return readJson(response);
}

export {
  checkNickname,
  createPost,
  fetchUser,
  markNotificationsRead,
  registerGoogleUser,
  registerUser
};
