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
        // console.log(error.response.data.token);
        axios({
            method: "GET",
            url: "/api/token"
        }).then( ({ data }) => {
            console.log(data.token);
        });
    }
    return Promise.reject(error);
};

ajax.interceptors.response.use( (response) => response, ins);

sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic2lnbmVkIjpmYWxzZSwiaWF0IjoxNTE2MjM5MDIyfQ.D0yO072iGsw34M5pkEytQ_fsyEVZxQvL4xWSdCF4rhQ");

ajax({
    method: "GET",
    url: "/api"
}).then( (r) => {
    console.log(r);
}).catch( ({ response }) => {
    console.warn(response.data);
});