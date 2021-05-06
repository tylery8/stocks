import { getAccountId } from "../browser/cookies";
import API from "./api";

function BackendAPI() {
    API.call(this, "https://ofyq71m8xd.execute-api.us-west-2.amazonaws.com");
}

BackendAPI.prototype = Object.create(API.prototype);

BackendAPI.prototype.createLogin = async function(username, password, apikey, callback) {
    const options = {
        method: 'POST',
        headers: {'x-stocks-username': username, 'x-stocks-password': password},
        data: {apikey}
    };
    this.request('/logins', options, callback)
}

BackendAPI.prototype.readLogin = async function(username, password, callback) {
    const options = {
        method: 'GET',
        headers: {'x-stocks-username': username, 'x-stocks-password': password}
    };
    this.request('/logins', options, callback, -1)
}

BackendAPI.prototype.readWatchlist = async function(callback) {
    const options = {
        method: 'GET',
        headers: {'x-stocks-account': getAccountId()}
    };
    this.request('/watchlist', options, callback)
}

BackendAPI.prototype.updateWatchlist = async function(watchlist, callback) {
    const options = {
        method: 'PUT',
        headers: {'x-stocks-account': getAccountId()},
        data: {watchlist}
    };
    this.request('/watchlist', options, callback)
}

BackendAPI.prototype.readPortfolio = async function(callback) {
    const options = {
        method: 'GET',
        headers: {'x-stocks-account': getAccountId()}
    };
    this.request('/portfolio', options, callback)
}

BackendAPI.prototype.deposit = async function(amount, callback) {
    const options = {
        method: 'POST',
        headers: {'x-stocks-account': getAccountId()},
        data: {amount}
    };
    this.request('/portfolio/deposit', options, callback)
}

BackendAPI.prototype.trade = async function(symbol, time, price, amount, buy, callback) {
    const options = {
        method: 'POST',
        headers: {'x-stocks-account': getAccountId()},
        data: {symbol, time, price, amount, buy}
    };
    this.request('/portfolio/trade', options, callback)
}

BackendAPI.prototype.deletePortfolio = async function(callback) {
    const options = {
        method: 'DELETE',
        headers: {'x-stocks-account': getAccountId()}
    };
    this.request('/portfolio', options, callback)
}

export default BackendAPI;