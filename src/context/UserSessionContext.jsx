import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { checkNickname, createPost, fetchUser, markNotificationsRead, registerGoogleUser, registerUser } from '../lib/api';

const STORAGE_KEY = 'jumblem-current-nickname';

const UserSessionContext = createContext(null);

function UserSessionProvider({ children }) {
  const [currentNickname, setCurrentNickname] = useState(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem(STORAGE_KEY) || '';
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(Boolean(currentNickname));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (currentNickname) {
      window.localStorage.setItem(STORAGE_KEY, currentNickname);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentNickname]);

  useEffect(() => {
    if (!currentNickname) {
      setCurrentUser(null);
      setIsLoadingUser(false);
      return;
    }

    let cancelled = false;
    setIsLoadingUser(true);

    fetchUser(currentNickname)
      .then(({ user }) => {
        if (!cancelled) {
          setCurrentUser(user);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCurrentUser(null);
          setCurrentNickname('');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentNickname]);

  useEffect(() => {
    if (!currentNickname) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      fetchUser(currentNickname)
        .then(({ user }) => {
          setCurrentUser(user);
        })
        .catch(() => {
          // Ignore transient polling failures.
        });
    }, 8000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [currentNickname]);

  const value = useMemo(() => ({
    currentUser,
    currentNickname,
    isLoadingUser,
    async validateNickname(nickname) {
      return checkNickname(nickname);
    },
    async register(formData) {
      const { user } = await registerUser(formData);
      setCurrentNickname(user.nickname);
      setCurrentUser(user);
      return user;
    },
    async registerWithGoogle(googleProfile) {
      const { user } = await registerGoogleUser(googleProfile);
      setCurrentNickname(user.nickname);
      setCurrentUser(user);
      return user;
    },
    async refreshUser() {
      if (!currentNickname) {
        return null;
      }

      const { user } = await fetchUser(currentNickname);
      setCurrentUser(user);
      return user;
    },
    async publishCategoryPost(payload) {
      const result = await createPost(payload);

      if (currentNickname) {
        const { user } = await fetchUser(currentNickname);
        setCurrentUser(user);
      }

      return result;
    },
    async openNotifications() {
      if (!currentNickname) {
        return null;
      }

      const { user } = await markNotificationsRead(currentNickname);
      setCurrentUser(user);
      return user;
    }
  }), [currentNickname, currentUser, isLoadingUser]);

  return <UserSessionContext.Provider value={value}>{children}</UserSessionContext.Provider>;
}

function useUserSession() {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error('useUserSession must be used inside UserSessionProvider');
  }

  return context;
}

export { UserSessionProvider, useUserSession };
