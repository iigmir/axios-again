import express from "express";
const app = express();
const port = 3000;

app.get("/api", (req, res) => {
    res.statusCode = 401;
    res.jsonp({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oJDyH4x4NVDO-1yan7zMc_ET60Iq9iPT348Oq4QSGyE"
    });
});

app.use("/static", express.static("static"));

app.get("/", (req, res) => {
    res.redirect("/static");
});

app.listen(port, () => {
    console.log(`Example app listening: http://127.0.0.1:${port}`);
});
