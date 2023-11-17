const key = 'accessToken'

export class SessionService {
    getAccessToken() {
        return sessionStorage.getItem(key);
    };
    setAccessToken(accessToken) {
        return sessionStorage.setItem(key, accessToken);
    };
    removeAccessToken() {
        return sessionStorage.removeItem(key);
    };
}