export function setAccessToken(accessToken) {
    sessionStorage.setItem('accessToken', accessToken);
}

export function getAccessToken() {
    return sessionStorage.getItem('accessToken');
}

export function clearAccessToken() {
    sessionStorage.removeItem('accessToken');
}

export function isUserLoggedIn(){
    return sessionStorage.getItem('accessToken') != undefined;
}

//по този начин заменяме sessionStorage навсякъде в другите файлове, с определена от тези функции