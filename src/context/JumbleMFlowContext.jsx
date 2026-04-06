import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'jumblem-flow-state-v3';

const defaultDraft = {
  handle: '@livejumble',
  songName: 'Midnight Frequency',
  selfAssessment: 'Reflective electronic drift',
  energy: 62,
  tempo: 'Mid-tempo',
  environment: 'Night streets',
  gpsLocation: 'Berlin, DE',
  latLabel: '52.5200 N',
  lngLabel: '13.4050 E'
};

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function locationTag(value) {
  return value.split(',')[0].trim();
}

function buildTagList(entry) {
  return [
    `#${slugify(entry.environment)}`,
    `#${slugify(entry.tempo)}`,
    `#${slugify(locationTag(entry.gpsLocation))}`
  ];
}

function buildTrackFromDraft(draft) {
  const id = `track-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    ...draft,
    likes: 0,
    createdAt: Date.now()
  };
}

function buildMetricLabel(entry) {
  return entry.energy >= 75 ? 'HIGH' : entry.energy <= 35 ? 'LOW' : `${(entry.energy / 10).toFixed(1)} CREDITS`;
}

function getInitialState() {
  if (typeof window === 'undefined') {
    return {
      draft: defaultDraft,
      tracks: [],
      activeTrackId: null
    };
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        draft: defaultDraft,
        tracks: [],
        activeTrackId: null
      };
    }
    const parsed = JSON.parse(stored);
    const tracks = Array.isArray(parsed.tracks) ? parsed.tracks : [];
    return {
      draft: { ...defaultDraft, ...(parsed.draft || {}) },
      tracks,
      activeTrackId: parsed.activeTrackId || tracks[0]?.id || null
    };
  } catch {
    return {
      draft: defaultDraft,
      tracks: [],
      activeTrackId: null
    };
  }
}

const FlowContext = createContext(null);

function FlowProvider({ children }) {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const activeTrack =
      state.tracks.find((track) => track.id === state.activeTrackId) ||
      state.tracks[0] ||
      null;

    const queue = state.tracks.map((track) => ({
      id: track.id,
      title: track.songName,
      artist: track.selfAssessment,
      meta: buildMetricLabel(track),
      track
    }));

    const posts = state.tracks.map((track) => ({
      id: track.id,
      handle: track.handle,
      title: `${track.gpsLocation} Street Grid Session`,
      body: `${track.songName} mapped to ${track.environment} with ${track.tempo.toLowerCase()} pacing.`,
      tags: buildTagList(track),
      likes: track.likes,
      energy: track.energy,
      gpsLocation: track.gpsLocation,
      songName: track.songName,
      selfAssessment: track.selfAssessment
    }));

    const tagScores = posts.reduce((accumulator, post) => {
      post.tags.forEach((tag) => {
        accumulator[tag] = (accumulator[tag] || 0) + post.likes;
      });
      return accumulator;
    }, {});

    const topTags = Object.entries(tagScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, score]) => ({ tag, score }));

    const mapPins = state.tracks.map((track, index) => {
      const presets = [
        { top: '22%', left: '18%' },
        { top: '54%', left: '58%' },
        { top: '30%', left: '74%' },
        { top: '68%', left: '28%' },
        { top: '18%', left: '52%' }
      ];
      return {
        id: track.id,
        handle: track.handle,
        gpsLocation: track.gpsLocation,
        songName: track.songName,
        position: presets[index % presets.length]
      };
    });

    return {
      draft: state.draft,
      tracks: state.tracks,
      activeTrack,
      queue,
      posts,
      topTags,
      mapPins,
      updateDraft(patch) {
        setState((current) => ({
          ...current,
          draft: { ...current.draft, ...patch }
        }));
      },
      createTrackFromDraft(patch = {}) {
        setState((current) => {
          const nextTrack = buildTrackFromDraft({ ...current.draft, ...patch });
          return {
            ...current,
            tracks: [nextTrack, ...current.tracks],
            activeTrackId: nextTrack.id
          };
        });
      },
      setActiveTrack(id) {
        setState((current) => ({
          ...current,
          activeTrackId: id
        }));
      },
      updateTrack(id, patch) {
        setState((current) => ({
          ...current,
          tracks: current.tracks.map((track) => (track.id === id ? { ...track, ...patch } : track))
        }));
      },
      deleteTrack(id) {
        setState((current) => {
          const tracks = current.tracks.filter((track) => track.id !== id);
          const safeTracks = tracks.length ? tracks : [];
          return {
            ...current,
            tracks: safeTracks,
            activeTrackId: safeTracks[0]?.id || null
          };
        });
      },
      likeTrack(id) {
        setState((current) => ({
          ...current,
          tracks: current.tracks.map((track) => (
            track.id === id ? { ...track, likes: track.likes + 1 } : track
          ))
        }));
      }
    };
  }, [state]);

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

function useJumbleMFlow() {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error('useJumbleMFlow must be used inside FlowProvider');
  }

  return context;
}

export { FlowProvider, useJumbleMFlow, defaultDraft, buildTagList };
