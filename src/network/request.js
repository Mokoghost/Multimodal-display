const axios = require('axios');

export function dataRequest() {
    return axios({
        baseURL: '/data',
        method: "get"
    })
}
