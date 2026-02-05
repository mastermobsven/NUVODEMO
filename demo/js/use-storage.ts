export function storeInStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function retrieveFromStorage(key: string): string | null {
    return localStorage.getItem(key);
}