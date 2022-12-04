import express from "express";
import jwt_decode from "jwt-decode";

const app = express();
const port = 3000;

const api_cb = (req, res) => {
    const get_decode = (code) => {
        try {
            return jwt_decode(code, { header: false });
        } catch (error) {
            return { signed: false, throwed: true, error };
        }
    };
    const decoded = get_decode(req.headers.authorization);
    const code = decoded.signed ? 200 : 401;
    const msg = decoded.signed ? "Authorised" : "Unauthorised";
    if (decoded.throwed) {
        res.jsonp({ code: 500, error: decoded.error });
        return;
    }
    res.jsonp({ msg, code });
};

const token_cb = (req, res) => {
    res.statusCode = 200;
    res.jsonp({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic2lnbmVkIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.4bXcQktUlw1RopkiZvOKxq3WdNwnhrjABxWr09xdo4E",
    });
};

const use_static = (req, res) => {
    res.redirect("/static");
};

app.get("/api",  api_cb);
app.get("/api/token", token_cb);
app.use("/static", express.static("static"));
app.get("/", use_static);
app.listen(port, () => { console.log(`Example app listening: http://127.0.0.1:${port}`); });
