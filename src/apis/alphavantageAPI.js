import API from "./api";

function AlphaVantageAPI(apiKey) {
    API.call(this, "https://www.alphavantage.co");
    this.apiKey = apiKey;
}

AlphaVantageAPI.prototype = Object.create(API.prototype);

AlphaVantageAPI.prototype.symbolSearch = async function(symbol, callback) {
    const options = {
        method: 'GET',
        params: {function: 'SYMBOL_SEARCH', keywords: symbol, apikey: this.apiKey}
    };
    this.request('/query', options, callback)
}

const alphavantageClient = new AlphaVantageAPI("AOC41OIBVSV7DTHM");
export default alphavantageClient;