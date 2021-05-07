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

export default TwelveDataAPI;