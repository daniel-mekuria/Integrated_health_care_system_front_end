import Cookies from 'js-cookie';

const SetCookie = (name, cookie) => {
    Cookies.set(name, cookie, { expires: 1 });
};

// Method to get data from cookies
const GetCookie = (name) => {
    return (Cookies.get(name));
};

// Method to remove data from cookies
const RemoveCookie = (name) => {
    Cookies.remove(name);
};

export {SetCookie, GetCookie,RemoveCookie}
