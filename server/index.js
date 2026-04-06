import express from 'express';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'app-data.json');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

function normalizeNickname(value = '') {
  return String(value).trim().toLowerCase().replace(/^@+/, '');
}

function displayNickname(value = '') {
  return normalizeNickname(value);
}

function normalizeCategory(value = '') {
  return String(value).trim().toLowerCase();
}

function validateContact(value = '') {
  const contact = String(value).trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = /^[+\d][\d\s-]{7,}$/.test(contact);
  return isEmail || isPhone;
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, 'utf8');
  } catch {
    await writeFile(
      dataFile,
      JSON.stringify({ users: [], posts: [] }, null, 2),
      'utf8'
    );
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(dataFile, 'utf8');
  return JSON.parse(raw);
}

async function writeStore(store) {
  await ensureStore();
  await writeFile(dataFile, JSON.stringify(store, null, 2), 'utf8');
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    contact: user.contact,
    nickname: user.nickname,
    category: user.category,
    picture: user.picture || '',
    authProvider: user.authProvider || 'manual',
    createdAt: user.createdAt,
    notificationsCount: user.notificationsCount || 0,
    activities: user.activities || []
  };
}

function createUniqueNickname(store, baseValue = '') {
  const base = normalizeNickname(baseValue)
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'jumblem_user';

  let candidate = base;
  let suffix = 1;

  while (store.users.some((user) => normalizeNickname(user.nickname) === candidate)) {
    candidate = `${base}_${suffix}`;
    suffix += 1;
  }

  return candidate;
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/users/check-nickname', async (request, response) => {
  const nickname = normalizeNickname(request.query.nickname);

  if (!nickname || nickname.length < 3) {
    response.status(400).json({ available: false, message: 'Nickname must be at least 3 characters.' });
    return;
  }

  const store = await readStore();
  const exists = store.users.some((user) => normalizeNickname(user.nickname) === nickname);

  response.json({
    available: !exists,
    message: exists ? 'That nickname is already taken.' : 'Nickname is available.'
  });
});

app.post('/api/users/register', async (request, response) => {
  const { name, contact, nickname, category } = request.body || {};
  const normalizedNickname = normalizeNickname(nickname);
  const normalizedCategory = normalizeCategory(category);

  if (!name || !String(name).trim()) {
    response.status(400).json({ message: 'Name is required.' });
    return;
  }

  if (!validateContact(contact)) {
    response.status(400).json({ message: 'Please enter a valid email or phone number.' });
    return;
  }

  if (!normalizedNickname || normalizedNickname.length < 3) {
    response.status(400).json({ message: 'Nickname must be at least 3 characters.' });
    return;
  }

  if (!/^[a-z0-9_]+$/.test(normalizedNickname)) {
    response.status(400).json({ message: 'Nickname can only use lowercase letters, numbers, and underscores.' });
    return;
  }

  if (!normalizedCategory) {
    response.status(400).json({ message: 'Pick a vibe category for notifications.' });
    return;
  }

  const store = await readStore();
  const exists = store.users.some((user) => normalizeNickname(user.nickname) === normalizedNickname);

  if (exists) {
    response.status(409).json({ message: 'That nickname is already taken.' });
    return;
  }

  const user = {
    id: `user-${Date.now()}`,
    name: String(name).trim(),
    contact: String(contact).trim(),
    nickname: displayNickname(normalizedNickname),
    category: normalizedCategory,
    createdAt: new Date().toISOString(),
    notificationsCount: 0,
    activities: [
      {
        id: `activity-${Date.now()}`,
        type: 'signup',
        message: `Joined JumbleM with the ${normalizedCategory} category.`,
        createdAt: new Date().toISOString()
      }
    ]
  };

  store.users.unshift(user);
  await writeStore(store);

  response.status(201).json({ user: publicUser(user) });
});

app.post('/api/users/google', async (request, response) => {
  const { name, email, picture, category } = request.body || {};
  const normalizedCategory = normalizeCategory(category) || 'city sprint';
  const safeEmail = String(email || '').trim().toLowerCase();

  if (!name || !String(name).trim()) {
    response.status(400).json({ message: 'Google profile did not return a valid name.' });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    response.status(400).json({ message: 'Google profile did not return a valid email.' });
    return;
  }

  const store = await readStore();
  const existingUser = store.users.find((user) => String(user.contact || '').trim().toLowerCase() === safeEmail);

  if (existingUser) {
    existingUser.picture = picture || existingUser.picture || '';
    existingUser.authProvider = 'google';
    existingUser.activities = [
      {
        id: `activity-${Date.now()}`,
        type: 'signup',
        message: 'Signed in with Google and refreshed your profile details.',
        createdAt: new Date().toISOString()
      },
      ...(existingUser.activities || [])
    ].slice(0, 10);
    await writeStore(store);
    response.json({ user: publicUser(existingUser) });
    return;
  }

  const nicknameSeed = safeEmail.split('@')[0] || String(name).trim().toLowerCase().replace(/\s+/g, '_');
  const nickname = createUniqueNickname(store, nicknameSeed);
  const createdAt = new Date().toISOString();
  const user = {
    id: `user-${Date.now()}`,
    name: String(name).trim(),
    contact: safeEmail,
    nickname,
    category: normalizedCategory,
    picture: String(picture || '').trim(),
    authProvider: 'google',
    createdAt,
    notificationsCount: 0,
    activities: [
      {
        id: `activity-${Date.now()}`,
        type: 'signup',
        message: `Joined JumbleM with Google in the ${normalizedCategory} category.`,
        createdAt
      }
    ]
  };

  store.users.unshift(user);
  await writeStore(store);
  response.status(201).json({ user: publicUser(user) });
});

app.get('/api/users/:nickname', async (request, response) => {
  const nickname = normalizeNickname(request.params.nickname);
  const store = await readStore();
  const user = store.users.find((entry) => normalizeNickname(entry.nickname) === nickname);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  response.json({ user: publicUser(user) });
});

app.post('/api/users/:nickname/notifications/read', async (request, response) => {
  const nickname = normalizeNickname(request.params.nickname);
  const store = await readStore();
  const user = store.users.find((entry) => normalizeNickname(entry.nickname) === nickname);

  if (!user) {
    response.status(404).json({ message: 'User not found.' });
    return;
  }

  user.notificationsCount = 0;
  await writeStore(store);
  response.json({ user: publicUser(user) });
});

app.post('/api/posts', async (request, response) => {
  const { authorNickname, category, songName, gpsLocation, selfAssessment } = request.body || {};
  const normalizedAuthor = normalizeNickname(authorNickname);
  const normalizedCategory = normalizeCategory(category);

  if (!normalizedAuthor || !normalizedCategory) {
    response.status(400).json({ message: 'Author nickname and category are required.' });
    return;
  }

  const store = await readStore();
  const createdAt = new Date().toISOString();
  const post = {
    id: `post-${Date.now()}`,
    authorNickname: displayNickname(normalizedAuthor),
    category: normalizedCategory,
    songName: String(songName || '').trim(),
    gpsLocation: String(gpsLocation || '').trim(),
    selfAssessment: String(selfAssessment || '').trim(),
    createdAt
  };

  store.posts.unshift(post);

  store.users = store.users.map((user) => {
    const isAuthor = normalizeNickname(user.nickname) === normalizedAuthor;
    const sameCategory = normalizeCategory(user.category) === normalizedCategory;

    if (isAuthor) {
      return {
        ...user,
        activities: [
          {
            id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'post',
            message: `Posted ${post.songName || 'a new vibe'} from ${post.gpsLocation || 'your current grid'} in ${normalizedCategory}.`,
            createdAt
          },
          ...(user.activities || [])
        ].slice(0, 10)
      };
    }

    if (sameCategory) {
      return {
        ...user,
        notificationsCount: (user.notificationsCount || 0) + 1,
        activities: [
          {
            id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            type: 'notification',
            message: `@${post.authorNickname} posted in your ${normalizedCategory} category.`,
            createdAt
          },
          ...(user.activities || [])
        ].slice(0, 10)
      };
    }

    return user;
  });

  await writeStore(store);
  response.status(201).json({ post });
});

app.listen(port, () => {
  console.log(`JumbleM API listening on http://localhost:${port}`);
});
