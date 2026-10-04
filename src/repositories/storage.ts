const APP_PREFIX = 'vidapet_operations_hub';
export const MVP_VERSION = 1;

export interface StorageData<T> {
  version: number;
  data: T;
  updatedAt: string;
}

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(`${APP_PREFIX}_${key}`);
      if (!raw) return defaultValue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && 'version' in parsed) {
        return parsed.data as T;
      }
      return parsed as T;
    } catch (e) {
      console.warn(`[VidaPet Storage] Error reading key ${key}:`, e);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      const payload: StorageData<T> = {
        version: MVP_VERSION,
        data: value,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(`${APP_PREFIX}_${key}`, JSON.stringify(payload));
    } catch (e) {
      console.error(`[VidaPet Storage] Error saving key ${key}:`, e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(`${APP_PREFIX}_${key}`);
    } catch (e) {
      console.error(`[VidaPet Storage] Error removing key ${key}:`, e);
    }
  },

  clearAll(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(APP_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.error(`[VidaPet Storage] Error clearing local data:`, e);
    }
  }
};
