const ajax = axios.create();

/**
 * Interceptor
 * @param {*} error 
 * @see <https://stackoverflow.com/a/73257544>
 * @returns {Promise}
 */
const ins = (error) => {
    const unauth = error.response.status === 401;
    if( unauth ) {
        console.log(error.response.data.token);
    }
    return Promise.reject(error);
};

ajax.interceptors.response.use( (response) => response, ins);

ajax({
    method: "GET",
    url: "/api"
}).then( (r) => {
    console.log(r);
}).catch( ({ response }) => {
    console.log(response.data);
});