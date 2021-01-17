const express = require("express");
const { readFileSync } = require("fs");
const app = express();
const path = require("path");

const session = require("express-session");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended : true}));

app.use(session({
    secret : "afa24hjalkj4lf",
    cookie: {secure: true}
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static("public"))

const pages = JSON.parse(readFileSync("pages.json"));

app.get("/", (req, res) => {
    res.render("index", {pages : pages})
});

app.get("/about", (req, res) => {
    res.render("about", {pages : pages})
});

app.get("/clubs", (req, res) => {
    res.render("clubs", {pages : pages})
});

app.get("/contact", (req, res) => {
    res.render("contact", {pages : pages})
});

app.get("/join", (req, res) => {
    res.render("join", {pages : pages})
});

app.get("/register", (req, res) => {
    res.render("register", {pages : pages})
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})