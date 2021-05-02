import Cookies from "js-cookie";

const accountCookieName = 'stockAccount'
const finnhubApikeyCookieName = 'finnhubApikey'
const publicFinnhubApikey = ' '

export const setAccountId = (account_id, remember) => {
	removeAccountId();
	Cookies.set(accountCookieName, account_id, remember ? {} : { expires: 1 });
};

export const getAccountId = () => {
	return Cookies.get(accountCookieName) || null;
};

export const removeAccountId = () => {
	Cookies.remove(accountCookieName);
};

export const setFinnhubApikey = (apikey, remember) => {
	removeFinnhubApikey();
	if (apikey) {
		Cookies.set(finnhubApikeyCookieName, apikey, remember ? {} : { expires: 1 });
	}
};

export const getFinnhubApikey = () => {
	return Cookies.get(finnhubApikeyCookieName) || publicFinnhubApikey;
};

export const removeFinnhubApikey = () => {
	Cookies.remove(finnhubApikeyCookieName);
};