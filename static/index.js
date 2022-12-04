const ajax = axios.create();

const set_token = (config) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic2lnbmVkIjpmYWxzZSwiaWF0IjoxNTE2MjM5MDIyfQ.D0yO072iGsw34M5pkEytQ_fsyEVZxQvL4xWSdCF4rhQ";
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};

const regain_token = function (response) {
    if (response.data.code === 401) {
        return new Promise((resolve, reject) => {
            const sent_new_ajax = ({ data }) => {
                response.config.headers["Authorization"] = `Bearer ${data.token}`;
                const new_ajax = axios.request(response.config);
                new_ajax.then(r => resolve(r.data)).catch(e => reject(e));
            };
            axios({ method: "GET", url: "/api/token" }).then(sent_new_ajax).catch(e => reject(e));
        });
    } else if (response.data.code !== 200) {
        return Promise.reject(response.data);
    } else {
        return Promise.resolve(response.data);
    }
};

ajax.interceptors.request.use( set_token, error => Promise.reject(error) );
ajax.interceptors.response.use( regain_token, error => Promise.reject(error) );

// Main AJAX
ajax({ method: "GET", url: "/api" }).then( (r) => {
    console.log(r);
    document.getElementById("res").innerText = r.msg;
}).catch( (e) => {
    console.error(e);
});