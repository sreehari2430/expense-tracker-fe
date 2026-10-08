export function getFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function setToStorage<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error(`Failed to save to localStorage: ${key}`);
    }
}

export function removeFromStorage(key: string): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch {
        console.error(`Failed to remove from localStorage: ${key}`);
    }
}
