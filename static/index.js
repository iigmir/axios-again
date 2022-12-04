// Interceptor
const ajax = axios.create();
ajax.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});
ajax({
    method: "GET",
    url: "/api"
}).then( (r) => {
    console.log(r);
}).catch( ({ response }) => {
    console.log(response.data);
});