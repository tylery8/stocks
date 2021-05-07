import Cookies from "js-cookie";

const accountCookieName = 'stockAccount'
const finnhubApikeyCookieName = 'finnhubApikey'
const publicFinnhubApikeys = [
	' ',
	'c28s4qiad3if6b4c4b40',
	'c2a983qad3iegn2283ig',
	'c2a98jaad3iegn2284d0',
	'c2a98t2ad3iegn2284q0',
	'c2a9d5iad3iegn228a20',
	'c2a9ddqad3iegn228ae0',
	'c2a9dnqad3iegn228at0',
	'c2apvc2ad3ibqimoht70',
	'c2apvqiad3ibqimohtl0'
]

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
	Cookies.set(finnhubApikeyCookieName, apikey || publicFinnhubApikeys[Math.floor(Math.random()*publicFinnhubApikeys.length)], remember ? {} : { expires: 1 });
};

export const getFinnhubApikey = () => {
	const finnhubApikey = Cookies.get(finnhubApikeyCookieName);
	if (finnhubApikey) {
		return finnhubApikey;
	}
	setFinnhubApikey();
	return Cookies.get(finnhubApikeyCookieName);
};

export const removeFinnhubApikey = () => {
	Cookies.remove(finnhubApikeyCookieName);
};