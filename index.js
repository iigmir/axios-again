import express from "express";
import jwt_decode from "jwt-decode";

const app = express();
const port = 3000;

// 流浪到淡水
app.get("/api",  (req, res) => {
    const authorization = (code) => {
        try {
            return jwt_decode(code, { header: true });
        } catch (error) {
            console.error(error);
            return { signed: false, throwed: true, error };
        }
    };
    const decoded = authorization(req.headers.authorization);
    const code = decoded.signed ? 200 : 401;
    const msg = decoded.signed ? "Authorised" : "Unauthorised";
    if( decoded.throwed ) {
        res.jsonp({ code: 503, error: decoded.error });
        return;
    }
    // res.statusCode = statusCode;
    res.jsonp({ msg, code });
});

app.get("/api/token", (req, res) => {
    res.statusCode = 200;
    res.jsonp({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic2lnbmVkIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.4bXcQktUlw1RopkiZvOKxq3WdNwnhrjABxWr09xdo4E",
    });
});

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
    res.redirect("/static");
});

app.listen(port, () => {
    console.warn(`Example app listening: http://127.0.0.1:${port}`);
});
