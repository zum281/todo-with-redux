export const loadState = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load state from local storage", error);
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save state to local storage", error);
  }
};
