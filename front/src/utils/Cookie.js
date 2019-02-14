class Cookie {
    constructor() {
        this.allCookies = Cookie.cookies();
        this.allKeys = this.keys();
    }

    static cookies() {
        let cookie = {};

        let cookies = document.cookie;
        if (cookies === "" || cookies === null) return cookie;

        let cookieList = cookies.split("; ");
        for (let i = 0; i < cookieList.length; i++) {
            let oneCookie = cookieList[i];
            let equalSignPosition = oneCookie.indexOf("=");
            let key = oneCookie.substring(0, equalSignPosition);
            let value = oneCookie.substring(equalSignPosition + 1);

            cookie[key] = value;
        }

        return cookie;
    };

    keys() {
        let keys = [];

        if (this.allCookies === null) return [];
        for (let key in this.allCookies) {
            if (this.allCookies.hasOwnProperty(key)) {
                keys.push(key)
            }
        }

        return keys;
    };

    key(n) {
        if (n < 0 || n >= this.allKeys.length) return null;
        return this.allKeys[n];
    };

    set(key, value, age = 30 * 24 * 60 * 60, path = "/") {
        if (!(key in this.allCookies)) this.allKeys.push(key);

        this.allCookies[key] = value;

        let oneCookie = key + "=" + encodeURIComponent(value);
        if (typeof age === "number") oneCookie += "; max-age=" + age;
        if (path) oneCookie += "; path=" + path;

        document.cookie = oneCookie;
    };

    get(key) {
        return this.allCookies[key] || null;
    };

    delete(key) {
        if (!(key in this.allCookies)) return;
        delete this.allCookies[key];

        this.allKeys = this.allKeys.map(value => {
            if (value !== key) {
                return value;
            }
        });

        document.cookie = key + "=; max-age=0";
    };

    clear() {
        if (this.allCookies.length !== 0) return;

        for (let key in this.allCookies) {
            document.cookie = key + "=; max-age=0";
        }

        this.allCookies = {};
        this.allKeys = [];
    };
}

export default Cookie;
