const initialAppstate = {
  languageChanged: false,
  language: "de",
  storyWasStarted: false,
  chapters: {
    current: "chapter1",
    revealed: ["chapter1"],
  },
  achievements: {
    revealed: []
  },
  scenes: {
    current: "scene1",
  },
  wiki: {
    current: "firstWikiEntry",
  },
  options: {
  }
};

export const storageKey =
  "sinnbild-" + require("../../../story/config.json").projectKey;

export const loadStateFromStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey));
}

export const saveStateToStorage = (state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

// Initialize App Sate if no State is found in browser storage
if (loadStateFromStorage() === null) {
  saveStateToStorage(initialAppstate)
}