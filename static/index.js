const ajax = axios.create();

/**
 * Interceptor
 * @param {*} response 
 * @see <https://stackoverflow.com/a/73257544>
 * @returns {Promise}
 */
const ins_res = (response) => {
    console.log(response);
    debugger;
    const unauth = response.response.status === 401;
    if( unauth ) {
        axios({
            method: "GET",
            url: "/api/token"
        }).then( ({ data }) => {
            console.log(data.token);
        });
    }
    return response;
};

ajax.interceptors.request.use( (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic2lnbmVkIjpmYWxzZSwiaWF0IjoxNTE2MjM5MDIyfQ.D0yO072iGsw34M5pkEytQ_fsyEVZxQvL4xWSdCF4rhQ";
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error) );

ajax.interceptors.response.use( function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code === 401) {
        return new Promise( (resolve, reject) => {
            axios({
                method: "GET",
                url: "/api/token"
            }).then( ({ data }) => {
                response.config.headers["Authorization"] = `Bearer ${data.token}`;
                return axios.request(response.config);
            }).catch( e => reject(e) );
        });
    } else if (response.data.code !== 200) {
        return Promise.reject(response.data);
    } else {
        return Promise.resolve(response.data);
    }
}, error => Promise.reject(error) );

ajax({
    method: "GET",
    url: "/api"
}).then( (r) => {
    console.log(r);
    // document.getElementById("res").innerText = r;
}).catch( (e) => {
    console.error(e);
});