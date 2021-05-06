import API from "./api";
import { getFinnhubApikey } from "../browser/cookies";

function FinnhubAPI(apiKey) {
    API.call(this, "https://finnhub.io/api/v1");
    this.apiKey = apiKey || getFinnhubApikey();
}

FinnhubAPI.prototype = Object.create(API.prototype);

FinnhubAPI.prototype.stockCandles = async function(symbol, resolution, count, callback) {
    const options = {
        method: 'GET',
        params: {symbol, resolution, count, token: this.apiKey}
    };
    this.request('/stock/candle', options, callback, 60000)
}

FinnhubAPI.prototype.quote = async function(symbol, callback, cache=10000) {
    const options = {
        method: 'GET',
        params: {symbol, token: this.apiKey}
    };
    this.request('/quote', options, callback, cache)
}

FinnhubAPI.prototype.financials = async function(symbol, callback) {
    const options = {
        method: 'GET',
        params: {symbol, metric: 'all', token: this.apiKey}
    };
    this.request('/stock/metric', options, callback, 300000)
}

FinnhubAPI.prototype.recommendation = async function(symbol, callback) {
    const options = {
        method: 'GET',
        params: {symbol, token: this.apiKey}
    }
    this.request('/stock/recommendation', options, callback, 300000)
}

FinnhubAPI.prototype.news = async function(symbol, callback) {
    if (symbol) {
        const date = new Date();
        const to = date.toISOString().substr(0, 10);

        date.setFullYear(date.getFullYear() - 1);
        const from = date.toISOString().substr(0, 10);

        const options = {
            method: 'GET',
            params: {symbol, from, to, token: this.apiKey}
        };
        this.request('/company-news', options, callback, 300000);
    } else {
        const options = {
            method: 'GET',
            params: {category: 'general', token: this.apiKey}
        };
        this.request('/news', options, callback, 60000);
    }
}

FinnhubAPI.prototype.country = async function(callback) {
    const options = {
        method: 'GET',
        params: {token: this.apiKey}
    };
    this.request('/country', options, callback)
}

export default FinnhubAPI;