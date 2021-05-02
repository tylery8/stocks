import API from "./api";

function TwelveDataAPI(apiKey) {
    API.call(this, "https://api.twelvedata.com");
    this.apiKey = apiKey;
}

TwelveDataAPI.prototype = Object.create(API.prototype);

TwelveDataAPI.prototype.search = async function(symbol, callback) {
    const options = {
        method: 'GET',
        params: {symbol}
    };
    this.request('/symbol_search', options, callback, -1)
}

TwelveDataAPI.prototype.timeSeries = async function(symbol, interval, outputsize, callback) {
    const options = {
        method: 'GET',
        params: {symbol, interval, outputsize, apikey: this.apiKey}
    };
    this.request('/time_series', options, callback, 60000)
}

export default TwelveDataAPI;