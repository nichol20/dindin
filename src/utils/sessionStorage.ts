export enum SessionStorageKeys {
    TOKEN = "token",
}

export const getFromCache = <T>(cacheKey: string): T | null => {
    const cachedData = window.sessionStorage.getItem(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    return null;
};

export const setToCache = (cacheKey: string, data: any) => {
    window.sessionStorage.setItem(cacheKey, JSON.stringify(data));
};