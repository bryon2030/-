import type { AppSettings } from '../types';

const STORAGE_KEY = 'thread_gen_settings';

export const StorageService = {
    saveSettings(settings: AppSettings) {
        // Always clear both first to avoid duplicates/stale data
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);

        if (settings.storageOption === 'local') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } else if (settings.storageOption === 'session') {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        }
        // If 'none', we just don't save (memory only handled by React state)
    },

    loadSettings(): AppSettings | null {
        // Check local first
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) return JSON.parse(local);

        // Check session
        const session = sessionStorage.getItem(STORAGE_KEY);
        if (session) return JSON.parse(session);

        return null;
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
    }
};
