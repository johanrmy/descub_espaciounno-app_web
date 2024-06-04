const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    const sameSite = "SameSite=None;";
    document.cookie = name + "=" + value + ";" + expires + ";" + sameSite + "Secure";
};

const getCookie = (name: string) => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
};

const deleteCookie = (name: string) => {
    const sameSite = "SameSite=None;";
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;" + sameSite + "Secure";
};

export {setCookie, getCookie, deleteCookie}