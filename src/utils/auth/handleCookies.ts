import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setLoginCookies = (userData: string): void => {
    cookies.set("userLogin", userData, { path: "/" });
};

export const getLoginCookies = (): string | undefined => {
    const cookiesResult = cookies.get("userLogin");
    if (!cookiesResult) return;
    return cookiesResult;
};

export const deleteLoginCookies = (): void => {
    cookies.remove("userLogin", { path: "/" });
};
