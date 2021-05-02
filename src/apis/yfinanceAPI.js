import API from "./api";

function YFinanceAPI(apiKey) {
    API.call(this, "https://apidojo-yahoo-finance-v1.p.rapidapi.com");

    this.headers = {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
}

YFinanceAPI.prototype = Object.create(API.prototype);

YFinanceAPI.prototype.search = async function(q, region, callback) {
    const options = {
        method: 'GET',
        params: {q, region},
        headers: this.headers
    };
    this.request('/auto-complete', options, callback)
}

const yfinanceClient = new YFinanceAPI("f552bc8ae5msh17dea5b6d6dff68p11eb62jsn2272b503509a");
export default yfinanceClient;