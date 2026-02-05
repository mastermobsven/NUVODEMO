export function storeInStorage(key, value) {
    localStorage.setItem(key, value);
}

export function retrieveFromStorage(key) {
    return localStorage.getItem(key);
}