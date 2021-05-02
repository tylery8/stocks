import axios from "axios";

function API(url) {
    this.url = url;
}

API.prototype.cache = {};

API.prototype.request = async function(endpoint, options, callback, cache) {
    options.url = this.url + endpoint;

    const cachedValue = this.checkCache(options);
    if (cachedValue) {
        if (cachedValue.resolved) {
            callback(cachedValue.data, cachedValue.data.data, null);
        } else {
            cachedValue.data.then((response) => {
                callback(response, response.data, null);
            }).catch((error) =>{
                callback(error.response || null, error.response ? error.response.data : null, error);
            })
        }
    } else {

        const promise = axios.request(options);

        this.updateCache(options, promise, false, cache);

        promise.then((response) => {
            callback(response, response.data, null);
            this.updateCache(options, response, true, cache);
        }).catch((error) => {
            callback(error.response || null, error.response ? error.response.data : null, error);
            this.clearCache(options);
        });
    }
}

API.prototype.checkCache = function(options) {
    const request = JSON.stringify(options);
    const cachedValue = this.cache[request];

    if (!cachedValue || (cachedValue.expiresAt && new Date().getTime() > cachedValue.expiresAt)) {
        return null
    }

    return cachedValue;
}

API.prototype.updateCache = function(options, data, resolved, cache) {
    if (cache) {
        const request = JSON.stringify(options);
        this.cache[request] = {
            resolved,
            expiresAt: cache >= 0 ? new Date().getTime() + cache : null,
            data
        }
    }
}

API.prototype.clearCache = function(options) {
    const request = JSON.stringify(options);
    this.cache[request] = undefined
}

export default API;